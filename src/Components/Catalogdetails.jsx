import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import QRCode from 'qrcode'; // Import the QRCode package
import Loading from './Loading';

const Catalogdetails = () => {
    const { id ,company} = useParams();
    const [catalogueItem, setCatalogueItem] = useState({});
    const [catalogueItem2, setCatalogueItem2] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedSection, setSelectedSection] = useState([]);
    const [readMoreIndex, setReadMoreIndex] = useState(null);
    const [record, setRecord] = useState([]);
    const [qrCodeUrl, setQrCodeUrl] = useState(''); 
    
   
    const fullUrl = `${window.location.origin}/${company}/${id}`;

    const getData = async () => {
        let catalogSections = [];
        try {
            setIsLoading(true);
            const { data } = await axios.get(`https://catalogbackend-1.onrender.com/items/${id}`);
            setCatalogueItem(data.item);
            catalogSections = JSON.parse(data.item.catalogSections);
            setCatalogueItem2(catalogSections);
            setRecord(catalogSections);
            console.log(fullUrl);
            
            generateQRCode(fullUrl); // Generate QR code for the catalog URL
        } catch (error) {
            toast.warning(error.response?.data?.message || 'No data found!', {
                position: "top-center",
                theme: "dark",
            });
        } finally {
            setIsLoading(false);
        }
    };

    
    const generateQRCode = (url) => {
        QRCode.toDataURL(url)
            .then((dataUrl) => {
                setQrCodeUrl(dataUrl); 
            })
            .catch((err) => {
                console.error('Error generating QR code:', err);
            });
    };

    useEffect(() => {
        getData();
    }, [id]);

    if (isLoading) {
        return <Loading />;
    }

    if (!catalogueItem) {
        return <div className='nodatamessege'>No data found!</div>;
    }

    const handleShowModal = (section) => {
        setSelectedSection(section);
        setShowModal(true);
    };

    const filtersData = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (searchValue === '') {
            setCatalogueItem2(record);
        } else {
            const filteredRecords = record.filter((f) =>
                f.title.toLowerCase().includes(searchValue)
            );
            setCatalogueItem2(filteredRecords);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className='viewpagebg'>
            <div className="container">
                <div className="row">
                    <div className="col-12  qrcodecontainer ">
                        {qrCodeUrl && <img src={qrCodeUrl}  className="qrcodeimage" alt="QR Code" />}
                        <p className='viewbox-descriptionurl mt-2'> {fullUrl}</p>
                    </div>

                    <div className="col-12 viewheading ">
                        <h1>{catalogueItem.company}</h1>
                    </div>

                    <div className="filter-section col-12 col-md-6 mb-3">
                        <label htmlFor="category-filter">Filter:</label>
                        <select id="category-filter" name="category">
                            <option value="all">All</option>
                            <option value="electronics">Documents</option>
                            <option value="fashion">Links</option>
                            <option value="books">PTD</option>
                        </select>
                    </div>

                    <div className="col-12 col-md-6 d-flex position-relative mb-3 mt-3">
                        <input
                            type="search"
                            className="form-control rounded-start ps-4"
                            placeholder="Search"
                            onChange={filtersData}
                            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                        />
                    </div>

                    {
                        catalogueItem2.length > 0 ? (
                            catalogueItem2.map((result, index) => (
                                <div className="col-12 col-md-4" key={index}>
                                    <div className="viewbox p-3 mb-3">
                                        <h1 className='viewbox-title'>{result.title}</h1>
                                        <p className='viewbox-tag'>Documents</p>
                                        <p className='viewbox-description'>
                                            {readMoreIndex === index ? result.description : `${result.description.substring(0, 70)}...`}
                                            {result.description.length > 100 && (
                                                <button className="btn btn-link p-0 viewbox-readmore" onClick={() => setReadMoreIndex(readMoreIndex === index ? null : index)}>
                                                    {readMoreIndex === index ? 'Show Less' : 'Read More'}
                                                </button>
                                            )}
                                        </p>
                                        <div className='text-right'>
                                            <button className="viewbox-button" onClick={() => handleShowModal(result.urls)}>
                                                Visit Links
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='nodatamessege'>No catalog sections available!</div>
                        )
                    }
                </div>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header>
                        <Modal.Title>Links</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedSection.length > 0 ? (
                            <ul>
                                {selectedSection.map((data, index) => (
                                    <li key={index}>
                                        <a href={data.url} target="_blank" rel="noopener noreferrer">{data.name}</a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No links available.</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-dark" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Catalogdetails;
