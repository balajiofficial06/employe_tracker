import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import axios from "axios"
import { toast } from "react-hot-toast";
import { Table } from "antd";

function UserList() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const getUsersData = async () => {
        try {
            const response = await axios.get("/api/admin/userList", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })

            if (response.data.success) {
                setUsers(response.data.data)
            }
        } catch (error) {
            toast.error("can't fetch the user details")
            console.log(error)
        }
    }

    const colums = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt'
        },
        {
            title: 'Action',
            render: () => {
                return <a href="/Delete-users">Delete</a>
            },
            key: 'action'
        },
    ]

    useEffect(() => { getUsersData() }, [])
    return <Layout>
        <h1 className="page-title">UserList</h1>
        <Table dataSource={users} columns={colums} />
    </Layout>
}

export default UserList