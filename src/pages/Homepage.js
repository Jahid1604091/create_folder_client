import styled from "styled-components"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../utils/constants';
import Folders from '../components/Folders'
const Homepage = () => {
    const [name, setName] = useState('');
    const [folders, setFolders] = useState([]);
    const [stateChange, setStateChange] = useState(false);


    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${url}/api/folder/delete/${id}`)
            setStateChange(prev => !prev)
            alert(data.message)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    const createFolder = async (folderName, parentId, depthLevel) => {
        try {
            const { data } = await axios.post(`${url}/api/folder/create`, { parentId, folderName, depthLevel }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            alert(data.message)

        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleAdd = async (parentId, depthLevel) => {
        let folderName = await prompt("Enter Folder Name", "New Folder");
        await createFolder(folderName, parentId, depthLevel)
        setStateChange(prev => !prev)
    }

    const fetchFolders = async () => {
        try {
            const { data } = await axios.get(`${url}/api/folder/read`)
            setFolders(data?.folderList)

        } catch (error) {

        }
    }

    useEffect(() => {
        fetchFolders()
    }, [stateChange])

    return (
        <Wrapper className="page-100">
            <div className="section">
                <div className="section-center">
                    <h4>Create Folder</h4>
                    <Folders folders={folders} handleAdd={handleAdd} handleDelete={handleDelete} />
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    
`
export default Homepage