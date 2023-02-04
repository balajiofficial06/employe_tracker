import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import axios from "axios"
import { toast } from "react-hot-toast";
import { Table } from "antd";

function ManagersList() {
    const [managers, setManagers] = useState([]);
    const dispatch = useDispatch();
    const getManagersData = async () => {
        try {
            const response = await axios.get("/api/admin/ManagerList", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })

            if (response.data.success) {
                setManagers(response.data.data)
            }
            console.log(response.data.data)
        } catch (error) {
            toast.error("can't fetch the user details")
            console.log(error)
        }
    }

    const changeManagerStatus = async (record, status) => {
        try {
            const response = await axios.post("/api/admin/change-manager-account-status",
                { managerId: record._id, status: status },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
            if (response.data.success) {
                getManagersData();
                toast.success(`Accout is ${status} successfully`)
            }
        } catch (error) {
            toast.error("can't fetch the manager details")
            console.log(error)
        }
    }

    const colums = [
        {
            title: 'Name',
            render: (_, record) =>
                <p>
                    {record.firstName} {record.lastName}
                </p>,

            key: 'name'
        },
        {
            title: 'Project',
            dataIndex: 'projectName',
            key: 'projectName',
        },
        {
            title: 'Tower',
            dataIndex: 'towerName',
            key: 'createdAt'
        },
        {
            title: 'Status',
            dataIndex: "status",
            key: 'action'
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) =>
                <div>
                    {record.status === 'pending' && <h1 className="anchor" onClick={() => { changeManagerStatus(record, 'approved') }}>Approve</h1>}
                    {record.status === 'approved' && <h1 className="anchor" onClick={() => { changeManagerStatus(record, 'blocked') }}>Block</h1>}
                </div>

        }
    ]

    useEffect(() => { getManagersData() }, [])
    return <Layout>
        <h1 className="page-title">ManagersList</h1>
        <Table dataSource={managers} columns={colums} />
    </Layout>

}

export default ManagersList;