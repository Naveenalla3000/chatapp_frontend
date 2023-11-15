import { Typography } from "@mui/material"

const ChatUserInfo = ({ isBorder, allInfo, handleClose }) => {
    return (
        <div className={`w-full p-1 ${isBorder ? "boder bg-[#f0f2f5] " : "h-auto"}`}>
            <div className="flex ml-4 justify-start items-center">
                <img
                    src={'/avatar.jpg'}
                    alt='icon'
                    className='w-10 h-10 rounded-full cursor-pointer'
                    onClick={() => setOpen(true)}
                />
                <div className="flex flex-col ml-4">
                    <p>Naveen</p>
                    <p>online</p>
                </div>
            </div>
            {
                allInfo && (
                    <div className="p-4 bg-white">
                        <table className="table-auto border">
                            <tbody className="border">
                                <tr className="border h-10 px-4">
                                    <td className="px-4 py-1 ">User Name </td>
                                    <td className="px-4 py-1 ">Ranga Reddy</td>
                                </tr>
                                <tr className="border h-10 px-4">
                                    <td className="px-4 py-1 w-full">Email</td>
                                    <td className="px-4 py-1 w-full">rangareddy@gundupaguludhu.com</td>
                                </tr>
                                <tr className="border h-10 px-4">
                                    <td className="px-4 py-1 w-full">Current helper</td>
                                    <td className="px-4 py-1 w-full">Deelep kumar</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="">
                            <p className="mt-8">Select / Change Helper : </p>
                            <select
                                className="mt-2 border rounded-lg block w-full p-2.5 outline-none ring-green-500"
                                defaultValue="default"
                            >
                                <option value="default" disabled>Choose a helper</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                                <option value="DE2">Germany</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR2">France</option>
                                <option value="US2">United States</option>
                                <option value="CA2">Canada</option>
                                <option value="FR3">France</option>
                                <option value="DE3">Germany</option>
                            </select>
                        </div>
                        <div className="flex justify-between mt-4 gap-4">
                            <button
                                className="bg-slate-100 hover:bg-slate-200 text-black border py-2 px-8 rounded-md w-full"
                                onClick={handleClose}
                            >Cancel
                            </button>
                            <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-8 rounded-md w-full">
                                Ok
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ChatUserInfo