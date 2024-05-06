import React, { useEffect, useState } from 'react';
import { db, auth } from './../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const [entries, setEntries] = useState([]);
    const [user] = useAuthState(auth); // Hook to check user authentication status
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "submissions"));
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setEntries(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "submissions", id));
            setEntries(entries.filter(entry => entry.id !== id)); // Update the state after deletion
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit/${id}`);
    };

    return (
        <div className='home-container'>
            <h2 className='home-title'>Research papers</h2>
            <div className="entry-list">
                {entries.map(entry => (
                    <div key={entry.id} className="entry">
                        <h4>{entry.title}</h4>
                        <p><strong>Abstract:</strong> {entry.abstract}</p>
                        <p><strong>Keywords:</strong> {entry.keywords}</p>
                        <p><strong>Author:</strong> {entry.author}</p>
                        {user && ( // Only show buttons if a user is logged in
                            <div className='btnDiv'>
                                <button className='btn-edit' onClick={() => handleEdit(entry.id)}>Edit</button>
                                <button onClick={() => handleDelete(entry.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;