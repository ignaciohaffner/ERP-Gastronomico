import { useState } from 'react'


export const useCheckRole = (user) => {
    const [colorRole, setColorRole] = useState("")

    if (user.rank === "null") {
        setColorRole("text-black-500")
    }
    else if (user.rank === "support") {
        setColorRole("text-green-500")
    } else if (user.rank === "manager") {
        setColorRole("text-yellow-500")
    } else if (user.rank === "admin") {
        setColorRole("text-green-500")
    }

    return colorRole

}