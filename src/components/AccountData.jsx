

import { useState } from 'react'
import { toast } from 'sonner'
import {Mars} from 'lucide-react'
import {Venus} from 'lucide-react'

export default function AccountInfo() {
    const [weight, setWeight] = useState(68)
    const [age, setAge] = useState(18)
    const [height, setHeight] = useState(175)
    const [isMale, setIsMale] = useState(true)


    function handleWeightChange(e) {
        setWeight(e.target.value)
    }

    function handleAgeChange(e) {
        setAge(e.target.value)
    }

    function handleHeightChange(e) {
        setHeight(e.target.value)
    }

    function handleSave() {
        if((weight < 20 || weight > 200) || (age < 12 || age > 99) || (height < 100 || height > 250)) {
            toast.error('Wprowadź poprawne dane')
        }else{
            toast.success('Zapisano dane')
        }
    }

    function handleChangeGender(is) {
        setIsMale(is)
    }

    return (
        <div className="grid grid-cols-1 mt-4">
            <div className="p-4 rounded-xl fancy-shadow bg-(--dominant) grid grid-cols-1 gap-4">
                <h2 className="text-lg font-semibold text-(--light-aqua)">Dane o użytkowniku</h2>
                <div className="flex items-center justify-between">
                    <label htmlFor="weight"><h3>Waga</h3></label>
                    <label><input id="weight" type="number" min='20' max='200' onChange={(e) => handleWeightChange(e)} value={weight} className="border-[2px] border-(--light-aqua) rounded-[6px] mr-2 w-[200px]" />KG</label>
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="age"><h3>Wiek</h3></label>
                    <label><input id="age" type="number" min='12' max='99' onChange={(e) => handleAgeChange(e)} value={age} className="border-[2px] border-(--light-aqua) rounded-[6px] mr-2 w-[200px]" />lat</label>
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="height"><h3>Wzrost</h3></label>
                    <label><input id="height" type="number" min='100' max='250' onChange={(e) => handleHeightChange(e)} value={height} className="border-[2px] border-(--light-aqua) rounded-[6px] mr-2 w-[200px]" />cm</label>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <h3 className="mt-auto mb-auto">Płeć</h3>
                        <div className='flex items-center gap-1 mr-6'>
                            <input type="radio" value='male' checked={isMale} id='male' name='gender' className='peer/male hidden' onChange={()=>handleChangeGender(true)}/>
                            <input checked={!isMale} type="radio" value='female' id='female' name='gender' className='peer/female hidden' onChange={()=>handleChangeGender(false)}/>
                            <label htmlFor="male" className='bg-gray-800 rounded-l-md cursor-pointer peer-checked/male:bg-gray-600 peer-checked/male:border-gray-400 peer-checked/male:border-1'><Mars size='42'/></label>
                            <label htmlFor="female" className='bg-gray-800 rounded-r-md cursor-pointer peer-checked/female:bg-gray-600 peer-checked/female:border-gray-400 peer-checked/female:border-1'><Venus size='42'/></label>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <button className="text-sm text-(--light-aqua) p-2 mr-6 cursor-pointer border-[2px] border-(--light-aqua) rounded-sm" onClick={()=>handleSave()}>Zapisz</button>
                </div>
            </div>
    </div>
    )
}