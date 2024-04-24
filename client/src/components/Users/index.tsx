import { useEffect, useState } from "react";
import { User } from "../../utils/interface";
import { useGet } from "../../hooks/useFetch";
import { GET, USERS_API } from "../../api/config";

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const { data: getData, refresh: refreshGetData } = useGet(USERS_API[GET], {}, {
        apiCall: "onload",
    });

    useEffect(() => {
        if (getData) {
            setUsers(getData.response || []);
        }
    }, [getData]);

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow">
                        {users.length === 0 ? <h1 className='flex items-center justify-center text-2xl font-bold pt-4'>No Users Found</h1> :
                            <table className="min-w-full divide-y divide-gray-200 table-fixed">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase ">
                                            Name
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase ">
                                            Email
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase ">
                                            Role
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase ">
                                            Status
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase ">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map(user => (
                                        <tr key={user._id} className="hover:bg-gray-100">
                                            <td className="w-1/5 p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                                <div className="text-base font-semibold text-gray-900">{user.name}</div>
                                            </td>
                                            <td className="w-3/5 p-4 overflow-hidden text-base font-normal text-gray-500">{user.email}</td>
                                            <td className="w-1/10 p-4 text-base font-medium text-gray-900 whitespace-nowrap">{user.role}</td>
                                            <td className="w-1/10 p-4 text-base font-medium text-gray-900 whitespace-nowrap">{user.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
