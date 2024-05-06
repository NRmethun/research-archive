import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './../firebase-config';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import './Admin.css'

const Admin = ({ editMode }) => {
    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [keywords, setKeywords] = useState('');
    const [author, setAuthor] = useState('');
    const { id } = useParams(); // Get the doc ID from URL parameters

    useEffect(() => {
        const fetchData = async () => {
            if (editMode && id) {
                const docRef = doc(db, "submissions", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitle(data.title);
                    setAbstract(data.abstract);
                    setKeywords(data.keywords);
                    setAuthor(data.author);
                } else {
                    console.log("No such document!");
                }
            }
        };

        fetchData();
    }, [editMode, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editMode && id) {
            const docRef = doc(db, "submissions", id);
            try {
                await updateDoc(docRef, { title, abstract, keywords, author });
                alert('Document successfully updated!');
                setTitle('');
                setAbstract('');
                setKeywords('');
                setAuthor('');
            } catch (error) {
                alert('Error updating document: ' + error.message);
            }
        } else {
            try {
                await addDoc(collection(db, "submissions"), {
                    title,
                    abstract,
                    keywords,
                    author,
                    createdAt: new Date()
                });
                alert('Document successfully written!');
                // Reset form if needed
                // setTitle('');
                // setAbstract('');
                // setKeywords('');
                // setAuthor('');
            } catch (error) {
                console.error("Error adding document: ", error);
                alert('Error adding document: ' + error.message);
            }
        }
    };

    return (
        <div className="admin-form">
            <h3>{editMode ? 'Edit Entry' : 'Submit New Research Entry'}</h3>
            <form onSubmit={handleSubmit}>
                <div className='input-box'>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Add Title of project'
                    />
                </div>
                <div>

                    <textarea
                        value={abstract}
                        onChange={(e) => setAbstract(e.target.value)}
                        placeholder='Add Abstract of project'
                    ></textarea>
                </div>
                <div>

                    <input
                        type="text"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder='Add comma separated project Keywords'
                    />
                </div>
                <div>

                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder='Add comma separated Author names'
                    />
                </div>
                <button type="submit">{editMode ? 'Update' : 'Save'}</button>
            </form>
        </div>
    );
};

export default Admin;
