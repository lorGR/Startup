import React, { useState } from 'react'

export const UserInfo = () => {
    const [date, setDate] = useState<Date>();
    const [age, setAge] = useState<number>();

    function getAge(dateString:Date) {
        var today = new Date();
        var birthDate = new Date(date!);
        var ageCalc = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            ageCalc--;
        }
        console.log(ageCalc)
        setAge(ageCalc);
    }

    function handleChangetoDate(event:any) {
        try {
            if(event.target.type === "text") {
                event.target.type = "date"
            }
        } catch (error) {
            console.error(error)
        }
    }

    function changeAge(date:Date) {
        try {
            
        } catch (error) {
            console.error(error)
        }
    }
    function handleChangetotext(event:any) {
        try {
            setDate(event.target.value)
            getAge(date!);
            if(event.target.type === "date") {
                event.target.type = "text";
                event.target.value = age;
            }
            console.log(date)
        } catch (error) {
            console.error(error)

        }
    }
    function handleUpdate(event:any) {
        try {
            setDate(event.target.value)
            console.log(date)
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div>
        <form>
            <input onChange={handleUpdate} name="birthday" onBlur={handleChangetotext} onClick={handleChangetoDate} type="text" placeholder='גיל'/>
        </form>
    </div>
  )
}
