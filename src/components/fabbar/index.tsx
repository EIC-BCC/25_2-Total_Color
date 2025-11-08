import DownloadGraph6Fab from "./DownloadGraph6Fab";
import GenerateGraphFab from "./GenerateGraphFab";
import ShowColoringFab from "./ShowColoringFab";

export default function FabBar() {
    return (
        <>
            <DownloadGraph6Fab />
            
            <ShowColoringFab />
        
            <GenerateGraphFab />
        </>
    );
}