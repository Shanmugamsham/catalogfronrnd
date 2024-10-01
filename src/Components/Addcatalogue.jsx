import React, { useContext, useState } from 'react';
import createusercontextdata from '../Context/Contextcreated';
import { Link } from 'react-router-dom';
import Loading from './Loading';
const Addcatalogue = () => {
  const { company, setcompany, catalogueadd, isupdate ,catalogSections, setCatalogSections,isloading} =
   useContext(createusercontextdata);

 
 

  const handleFieldChange = (index, event) => {
    const values = [...catalogSections];
    values[index][event.target.name] = event.target.value;
    setCatalogSections(values);
  };


  const handleUrlChange = (sectionIndex, urlIndex, event) => {
    const values = [...catalogSections];
    values[sectionIndex].urls[urlIndex][event.target.name] = event.target.value;
    setCatalogSections(values);
  };


  const handleAddUrl = (index) => {
    const values = [...catalogSections];
    values[index].urls.push({ name: '', url: '' });
    setCatalogSections(values);
  };


  const handleRemoveUrl = (sectionIndex, urlIndex) => {
    const values = [...catalogSections];
    values[sectionIndex].urls.splice(urlIndex, 1);
    setCatalogSections(values);
  };


  const handleAddSection = () => {
    setCatalogSections([...catalogSections, { title: '', description: '', urls: [{ name: '', url: '' }] }]);
  };


  const handleRemoveSection = (index) => {
    const values = [...catalogSections];
    values.splice(index, 1);
    setCatalogSections(values);
  };

  
  if (isloading) {
    return <Loading />;
  }


  return (
      <div className="container-fluid mt-5">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={catalogueadd} encType="multipart/form-data">
              <div className="text-right">
                <Link to={"/dashboard"} >
                  <i className="fa fa-times cancelbutton custom-cancel-btns" aria-hidden="true"></i>
                </Link>
              </div>
              <h1 className="mt-2 mb-5">Add Catalog</h1>

              <div className="form-group">
                <label htmlFor="title_field">COMPANY NAME</label>
                <input
                  type="text"
                  id="title_field"
                  className="form-control"
                  name="company"
                  value={company}
                  onChange={(e) => setcompany(e.target.value)}
                  required={true}
                />
              </div>

              <h3 className="mt-4">Add Titles, Descriptions, and URLs</h3>

              {catalogSections.map((section, index) => (
                <div key={index}>
                  <div className="form-group">
                    <label htmlFor={`title_field_${index}`}>Title {index + 1}</label>
                    <input
                      type="text"
                      id={`title_field_${index}`}
                      className="form-control"
                      name="title"
                      value={section.title}
                      onChange={(event) => handleFieldChange(index, event)}
                      required={true}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`description_field_${index}`}>Description {index + 1}</label>
                    <textarea
                      id={`description_field_${index}`}
                      className="form-control"
                      name="description"
                      value={section.description}
                      onChange={(event) => handleFieldChange(index, event)}
                      required={true}
                      rows="4"
                    />
                  </div>

                  <h4>URLs for Title {index + 1}</h4>
                  {section.urls.map((url, urlIndex) => (
                    <div key={urlIndex}>
                      <div className="form-group">
                        <label htmlFor={`url_name_${index}_${urlIndex}`}>URL Name {urlIndex + 1}</label>
                        <input
                          type="text"
                          id={`url_name_${index}_${urlIndex}`}
                          name="name"
                          className="form-control"
                          value={url.name}
                          onChange={(event) => handleUrlChange(index, urlIndex, event)}
                          required={true}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor={`url_${index}_${urlIndex}`}>URL {urlIndex + 1}</label>
                        <input
                          type="url"
                          id={`url_${index}_${urlIndex}`}
                          name="url"
                          className="form-control"
                          value={url.url}
                          onChange={(event) => handleUrlChange(index, urlIndex, event)}
                          required={true}
                        />
                      </div>

                      <button
                        type="button"
                        className=" btn-danger mb-3"
                        onClick={() => handleRemoveUrl(index, urlIndex)}
                      >
                        Remove URL
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className=" btn-warning mb-5"
                    onClick={() => handleAddUrl(index)}
                  >
                    Add Another URL
                  </button> <br/>

                  <button
                    type="button"
                    className=" btn-danger mb-2 btn-block"
                    onClick={() => handleRemoveSection(index)}
                  >
                    Remove Title & Description
                  </button>
                </div>
              ))}

              <button type="button" onClick={handleAddSection} className=" btn-warning btn-block  mb-2">
                Add Another Title, Description & URL
              </button>

              <button disabled={isupdate} type="submit" className="btn-success btn-block mt-2">
                Submit Catalog
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Addcatalogue;
