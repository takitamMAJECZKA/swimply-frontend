

export default function AccountInfo() {
    return (
        <div className="grid grid-cols-1">
            <div className="p-4 rounded-xl fancy-shadow bg-(--dominant) grid grid-cols-1 gap-4">
                <h2 className="text-lg font-semibold text-(--light-aqua)">Dane użytkownika</h2>
                <div className="flex items-center justify-between">
                    <h3>Waga</h3>
                    <label><input type="number" min='20' className="border-[2px] border-(--light-aqua) rounded-[6px] mr-2" />KG</label>
                </div>
                <div className="flex items-center justify-between">
                    <h3>Wiek</h3>
                    <label><input type="number" min='12' className="border-[2px] border-(--light-aqua) rounded-[6px] mr-2" />lat</label>
                </div>
                <div className="flex items-center justify-between">
                    <h3>Wzrost</h3>
                    <label><input type="number" min='100' className="border-[2px] border-(--light-aqua) rounded-[6px] mr-2" />cm</label>
                </div>
                <div className="flex items-center justify-end">
                    <button className="text-sm text-(--aqua) p-2 cursor-pointer border-[2px] rounded-sm">Zapisz</button>
                </div>
            </div>
        </div>
    )
}