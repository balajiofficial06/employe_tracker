import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Card, Button } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import Meta from "antd/es/card/Meta";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice";


function BlockSeats() {

    const { user } = useSelector((state) => state.user);
    const [seatId, setSeatId] = useState([...user?.bookedSeat || []])
    const [docs, setDocs] = useState([]);
    const getDocs = async () => {
        try {
            const response = await axios.get("/api/user/block-seats", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })

            if (response.data.success) {
                setDocs(response.data.data)
            }
        } catch (error) {
            toast.error("unable to fetch the details")
            console.log(error)
        }
    }

    const bookSeat = async (value) => {
        try {
            const response = await axios.post("/api/user/bookSeat", {
                id: value,
                user: user
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })

            if (response.data.success) {
                toast.success('Your seat has been booked')

                setSeatId(prevVal => [...prevVal, value])
                console.log(seatId)
                setDocs(prevDocs => prevDocs.map(doc => {
                    if (doc._id === value) {
                        doc.seatsAvailable -= 1;
                    }
                    return doc;
                }))

            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("can't fetch the user details")
            console.log(error)
        }
    }
    useEffect(() => { getDocs() }, [])
    return <Layout>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            {Array.isArray(docs) && docs.map((doc) => (
                <Card
                    key={doc._id}
                    style={{ width: 300, margin: "16px" }}
                    actions={[
                        <Button type="primary" disabled={user.bookedSeat?.includes(doc._id) || seatId.includes(doc._id)} onClick={() => { return bookSeat(doc._id) }}>Book</Button>
                    ]}
                >
                    <Meta
                        title={`ODC ${doc.roomNumber}`}
                        description={`Date: ${doc.date}`}
                    />
                    <p>
                        Number of Seats available: {doc.seatsAvailable}
                        <br />
                    </p>
                </Card>
            ))}
        </div>
    </Layout>
}

export default BlockSeats;