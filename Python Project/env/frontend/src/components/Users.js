import React,{useState,useEffect} from 'react'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'
import { Axios } from '../AxiosConfig';
// import '/vendor/datatables/dataTables.bootstrap4.min.js'


export const Users = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        Axios("/getUsers").then((res) => {
            console.log(res.data)
            setUsers([...res.data])
            })
    },[])
    console.log(users)
    return (
        <body id="page-top">
            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" class="d-flex flex-column">
                    {/* <!-- Main Content --> */}
                    <div id="content">
                        <TopNav />
                        <div class="container-fluid">
                            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 class="h3 mb-0 text-gray-800">Users List</h1>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <div id="dataTable_wrapper" class="dataTables_wrapper dt-bootstrap4">
                                        <div class="row">
                                            <div class="col-sm-12 col-md-6">
                                                <div class="dataTables_length" id="dataTable_length">
                                                    <label>Show 
                                                        <select name="dataTable_length" aria-controls="dataTable" class="custom-select custom-select-sm form-control form-control-sm">
                                                            <option value="10">10</option><option value="25">25</option><option value="50">50</option>
                                                            <option value="100">100</option>
                                                            </select> 
                                                            entries</label></div></div>
                                                            </div>
                                                            <div class="row"><div class="col-sm-12"><table class="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" >
                                                <thead>
                                                    <tr role="row">
                                                    <th class="sorting sorting_asc" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" >User Name</th>
                                                    <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1">Contact</th>
                                                    <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1">User Role</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                    users.map(i=>(
                                                    <tr class="odd">
                                                        <td class="sorting_1">{i.User_Name}</td>
                                                        <td>{i.Phone}</td>
                                                        <td>{i.Role}</td>
                                                    </tr>
                                                    ))

                                                    }
                                                    </tbody>
                                            </table>
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </body>
    )
}

