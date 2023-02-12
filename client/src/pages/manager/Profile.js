import Layout from "../../components/Layout";
import React, { useEffect, useState } from 'react';
import { DatePicker, Select, InputNumber, Button, Dropdown } from 'antd';
import axios from "axios";
import { toast } from "react-hot-toast";


function Profile() {
    const [managers, setManagers] = useState();
    const managerDetails = async () => {
        try {
            const response = await axios.get("/api/manager/managerDetails", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })

            if (response.data.success) {
                setManagers(response.data.data[0])
            }
            console.log(response.data.data)
        } catch (error) {
            toast.error("can't fetch the user details")
            console.log(error)
        }
    }
    const { Option } = Select;

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedSeats, setSelectedSeats] = useState(1);
    const [protocol, setProtocol] = useState('');

    const handleDateChange = (date, dateString) => {
        setSelectedDate(date);
    };
    const handleRoomChange = (value) => {
        setSelectedRoom(value);
    };
    const handleSeatsChange = (value) => {
        setSelectedSeats(value);
    };
    const handleProtocolChange = (value) => {
        setProtocol(value);
    };
    const handleSubmit = async () => {
        console.log(selectedDate, selectedRoom, selectedSeats, protocol)

        try {
            const response = await axios.post(
                "/api/manager/seat-allocation",
                {
                    date: selectedDate,
                    roomNumber: selectedRoom,
                    numberOfSeats: selectedSeats,
                    covidProtocol: protocol
                },
                {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            if (response.data.success) {
                toast.success(response.data.message);
                toast("Seats have been allocated");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("somthing went wrong");
        }
    };

    const items = [
        {
            key: '1',
            lable: 'Yes'
        },
        {
            key: '2',
            lable: 'no'
        }
    ]
    useEffect(() => { managerDetails() }, [])
    return <Layout>
        <h1> Select available seats</h1>
        <div style={{ padding: '5px' }}>
            <DatePicker onChange={handleDateChange} />
            <Select defaultValue="Select Room" onChange={handleRoomChange} style={{ left: "25%" }} >

                <Option value={managers?.roomNumber}>{managers?.roomNumber}</Option>

            </Select>
            <InputNumber
                min={1}
                defaultValue={1}
                onChange={handleSeatsChange}
                style={{ left: "50%" }}
            />
        </div>
        <hr />
        <div style={{ padding: '5px' }}>
            <Select defaultValue="" onChange={handleProtocolChange}>
                <Option value="">Select COVID protocol</Option>
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
            </Select>
            <hr />
            <Button type="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>

    </Layout>
}

export default Profile