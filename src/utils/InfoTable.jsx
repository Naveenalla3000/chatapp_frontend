import React from 'react'

const InfoTable = () => {
    return (
        <div>
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
                        <td className="px-4 py-1 w-full">Role</td>
                        <td className="px-4 py-1 w-full">User</td>
                    </tr>
                    <tr className="border h-10 px-4">
                        <td className="px-4 py-1 w-full">Current helper</td>
                        <td className="px-4 py-1 w-full">Deelep kumar</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default InfoTable