import { useSelector} from "react-redux"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import {
    updateUserStart, 
    updateUserSuccess, 
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure
} from "../redux/user/userSlice.js"

export default function Profile() {

    const fileref = useRef(null)
    const {currentUser, loading, error} = useSelector((state) => state.user)
    const [formData, setFormData] = useState({})
    const [userSuccess, setUserSuccess] = useState(false)
    
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            dispatch(updateUserStart())
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if (data.success === false) {
                dispatch(updateUserFailure(data.message))
                return
            }
            dispatch(updateUserSuccess(data))
            setUserSuccess(true)
        } catch (error) {
            dispatch(updateUserFailure(error.message))
        }
    }

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart())
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: "DELETE"
            })
            const data = await res.json()
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message))
                return
            }
            dispatch(deleteUserSuccess(data))
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart())
            const res = await fetch('/api/auth/signout')
            const data = await res.json()
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message))
                return
            }
            dispatch(signOutUserSuccess(data))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl front-semibold text-center my-7">Profile</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="file" ref={fileref} hidden accept="image/*"/>
                <img onClick={() => fileref.current.click()} src={currentUser.avatar} alt="profile" 
                    className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
                />
                <input type="text" placeholder="username" id="username" 
                    className="border p-3 rounded-lg" defaultValue={currentUser.username} 
                    onChange={handleChange}
                />
                <input type="email" placeholder="email" id="email" 
                    className="border p-3 rounded-lg" defaultValue={currentUser.email} 
                    onChange={handleChange}
                />
                <input type="password" placeholder="password" id="password" 
                    className="border p-3 rounded-lg" onChange={handleChange} 
                />
                <button 
                    disabled={loading}
                    className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
                > {loading ? 'Loading...' : 'Update'}
                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer ">Delete Account</span>
                <span onClick={handleSignOut} className="text-red-700 cursor-pointer ">Sign Out</span>
            </div>
            <p className="text-red-700 mt-5">{error ? error : ''}</p>
            <p className="text-green-700 mt-5">{userSuccess ? 'updated successfully' : ''}</p>
        </div>
    )
}