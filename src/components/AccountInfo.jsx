import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



export default function AccountInfo() {
    return (
        <div className="grid grid-cols-1 gap-7 p
        -4">
            <div className="p-4 rounded-xl fancy-shadow bg-(--dominant)">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-(--light-aqua)">Dane konta</h2>
                    <button className="text-sm text-(--aqua)">Edytuj</button>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        <Avatar className='w-10 h-10'>
                            <AvatarImage src="https://github.com/.png" />
                            <AvatarFallback className='text-(--dominant)'>Ma</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <h3 className="text-sm font-semibold text-(--light-aqua)">Maciej Majka</h3>
                            <p className="text-xs text-(--aqua)"></p>
                        </div>
                    </div>
                    <div className="text-sm text-(--aqua)">Zmień zdjęcie</div>
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-(--aqua)">Nazwa użytkownika</p>
                        <p className="text-sm font-semibold text-(--light-aqua)">Loginasd</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-(--aqua)">Hasło</p>
                        <p className="text-sm font-semibold text-(--light-aqua)">********</p>
                    </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-(--aqua)">Adres email</p>
                        <p className="text-sm font-semibold text-(--light-aqua)">macius@example.com</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}