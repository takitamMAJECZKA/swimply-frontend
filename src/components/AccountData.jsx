

import { useState, useContext } from 'react'
import { toast } from 'sonner'
import {Mars} from 'lucide-react'
import {Venus} from 'lucide-react'


import { DataContext } from './DataProvider'
import { getAccessToken } from '../getAccessToken.js'

export default function AccountData() {
    const {workoutsData, workoutsLoading, accountData, accountLoading, refreshData } = useContext(DataContext)

    const [weight, setWeight] = useState(accountData.weight)
    const [isMale, setIsMale] = useState(accountData.isMale)
    const [caloriesGoal, setCaloriesGoal] = useState(accountData.caloriesGoal);

    function handleWeightChange(e) {
        setWeight(parseInt(e.target.value))
    }

    function handleChangeGender(is) {
        setIsMale(is)
    }


    function handleCaloriesGoalChange(e) {
        setCaloriesGoal(parseInt(e.target.value))
    }

    async function handleSave() {
        if((weight < 20 || weight > 200) || (weight === '') || (caloriesGoal <= 0) || (caloriesGoal == '')) {
            toast.error('Wprowadź poprawne dane')
        }else{
            const data = {
                weight: weight,
                isMale: isMale,
                caloriesGoal: caloriesGoal
            }

            const request = new Request('https://swimply.pl/api/v2/account/info',{
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            try {
                const response = await fetch(request);
                // const json = await response.json()
                if (response.status == 428) {
                    await getAccessToken();
                    return handleSave()
                }
                
                toast.promise(response, {
                    loading: 'Proszę czekać...',
                    success: 'Dane zostały zapisane',
                    error: 'Błąd po stronie bazy danych',
                });
                refreshData()
            }catch (error) {
                toast.error('Błąd: ' + error.message)
                return
            }
        }
    }

    return (
        <div className="grid grid-cols-1 mt-4">
            <div className="p-4 rounded-xl fancy-shadow bg-(--dominant) grid grid-cols-1 gap-4">
                <h2 className="text-lg font-semibold text-(--light-aqua)">Dane o użytkowniku</h2>
                <div className="flex items-center justify-between">
                    <label htmlFor="weight"><h3>Waga</h3></label>
                    <label><input id="weight" type="number" min='20' max='200' onChange={(e) => handleWeightChange(e)} value={weight} className="border-[2px] border-(--light-aqua) rounded-[6px] mr-2 w-[200px]" />kg</label>
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="caloriesGoal"><h3>Cel kalorii</h3></label>
                    <label><input id="caloriesGoal" type="number" min='0' onChange={(e) => handleCaloriesGoalChange(e)} value={caloriesGoal} className="border-[2px] border-(--light-aqua) rounded-[6px] mr-2 w-[200px]" />kcal</label>
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