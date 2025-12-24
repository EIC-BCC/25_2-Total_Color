import { FormEventHandler, useState } from "react";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "../ui/shadcn-io/dropzone";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useGraph } from "@/contexts/GraphContext";
import { AcceptedFileExtensions } from "@/types";
import { layouts } from ".";
import GraphFactory from "@/lib/graphs/GraphFactory";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { RippleButton } from "../ui/shadcn-io/ripple-button";
import { DownloadIcon } from "lucide-react";


interface GraphFreeOptions {
    fileExtension: AcceptedFileExtensions,
    content: string
}

interface FreeGraphGeneratorProps {
    closeDialog: () => void
}

export default function FreeGraphGenerator({
    closeDialog
}: FreeGraphGeneratorProps) {
    const { initGraph } = useGraph();
    const [files, setFiles] = useState<File[]>();
    const [graphFile, setGraphFile] = useState<GraphFreeOptions & { name: string }>();
    const [layout, setLayout] = useState<string>('');
    const [isColored, setIsColored] = useState(false);

    const handleDrop = (newFiles: File[]) => {
        setFiles(newFiles);

        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                const isG6 = /.+\.g6$/g;

                if (isG6.test(newFiles[0].name)) {
                    setGraphFile({
                        name: newFiles[0].name.replace(/\..+$/, ''),
                        fileExtension: 'g6',
                        content: reader.result.split(/\s+/g)[0]
                    });
                } else {
                    setGraphFile({
                        name: newFiles[0].name.replace(/\..+$/, ''),
                        fileExtension: 'txt',
                        content: reader.result
                    });
                }
            }
        };

        reader.readAsText(newFiles[0]);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const graph = GraphFactory.make({
            graphFree: graphFile ? {
                fileExtension: graphFile.fileExtension,
                content: graphFile.content,
                isColored: isColored
            } : null
        });

        initGraph(graph, {
            layout,
            name: graphFile ? graphFile.name : 'free-graph',
            coloring: {
                orientation: 'color',
                show: false
            },
            active: true
        });
        
        closeDialog();
    };

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
        >   
            <RippleButton className="bg-blue-500 hover:bg-blue-500">
                Gerar um grafo do zero
            </RippleButton>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">OU</span>
                </div>
            </div>

            <section className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 items-center">
                    <Dropzone
                        accept={{ 'text/plain': ['.txt', '.g6'] }}
                        maxFiles={1}
                        maxSize={1024 * 1024 * 10}
                        onDrop={handleDrop}
                        onError={console.error}
                        src={files}
                    >
                        <DropzoneEmptyState>
                            <div className="flex flex-col gap-2 items-center">
                                <DownloadIcon />
                                <p>Adicione um grafo a partir de um arquivo .txt ou .g6</p>

                                <div className="text-gray-600 text-sm">
                                    <p>Arraste e solte ou clique para carregar</p>
                                    <p>Tamanho máximo: 10MB</p>
                                </div>
                            </div>
                        </DropzoneEmptyState>

                        <DropzoneContent>
                            <div className="flex flex-col gap-2 items-center">
                                <DownloadIcon />
                                <p>{files && files[0].name}</p>

                                <div className="text-gray-600 text-sm">
                                    <p>Arraste e solte ou clique para substituir</p>
                                </div>
                            </div>                            
                        </DropzoneContent>
                    </Dropzone>
                </div>
                
                <div className="w-full flex">
                    <Collapsible className="w-full">
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-2 font-medium [&[data-state=open]>svg]:rotate-180">
                            Instruções para arquivo .txt
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 transition-transform duration-200"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-2">
                            <div className="rounded-md border flex flex-col gap-4 px-4 py-3 text-sm text-justify">
                                <p>O conteúdo do arquivo <em>.txt</em> deve ser a matriz de adjacências do grafo não-direcionado. Somente o triângulo superior da matriz com exceção da diagonal principal será considerado.</p>

                                <p>Exemplo de conteúdo:</p>

                                <code className="flex flex-col pl-4">
                                    <span>0111</span>
                                    <span>0011</span>
                                    <span>0001</span>
                                    <span>0000</span>
                                </code>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>

                <div className="border-2 hover:opacity-70 rounded-md">
                    <label className="cursor-pointer flex gap-2 p-2">
                        <input
                            type="checkbox"
                            className="cursor-pointer"
                            checked={isColored}
                            onChange={(e) => setIsColored(e.target.checked)}
                        />

                        Grafo com coloração inclusa
                    </label>
                </div>

                <section className={`${graphFile ? 'flex flex-col gap-4' : 'hidden'}`}>
                    <div className="flex gap-4">
                        <Select value={layout} onValueChange={setLayout}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione um layout" />
                            </SelectTrigger>
                            <SelectContent>
                                {layouts.map((layout) => (
                                    <SelectItem key={layout.value} value={layout.value}>
                                        {layout.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </section>
            </section>

            {graphFile &&
                <RippleButton className="bg-blue-500 hover:bg-blue-500">
                    Gerar um grafo a partir de um arquivo
                </RippleButton>
            }
        </form>
    );
}