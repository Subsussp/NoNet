import { Request } from "./EditHandling";

function Delete({Config,refresh}) {
    return (
        <div >
            <button className="w-full text-red bg-red p-2" onClick={() => {
                Request(Config.url, 'delete', Config.config).then((e) => {
                    console.log(e);
                    if (e.data !== null) {
                        refresh();
                    }
                });
            }}>X</button>
        </div>
    );
}
export default Delete