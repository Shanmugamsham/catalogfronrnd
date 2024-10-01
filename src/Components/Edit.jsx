


import React, { useContext, useEffect, useState } from 'react';
import createusercontextdata from '../Context/Contextcreated';
import { Link } from 'react-router-dom';
import Loading from './Loading';
const EditCatalogue = () => {
  const { setmyprofile2, myprofile2, isupdate, getcatalogueupdate,isloading } = useContext(createusercontextdata);

  useEffect(() => {

    if (!myprofile2.catalogSections) {
      setmyprofile2({
        ...myprofile2,
        catalogSections: [{ title: "", description: "", urls: [{ name: "", url: "" }] }]
      });
    }
  }, [myprofile2]);

  const handleFieldChange = (index, event) => {
    const updatedSections = [...myprofile2.catalogSections];
    updatedSections[index][event.target.name] = event.target.value;
    setmyprofile2({ ...myprofile2, catalogSections: updatedSections });
  };

  const handleUrlChange = (sectionIndex, urlIndex, event) => {
    const updatedSections = [...myprofile2.catalogSections];
    updatedSections[sectionIndex].urls[urlIndex][event.target.name] = event.target.value;
    setmyprofile2({ ...myprofile2, catalogSections: updatedSections });
  };

  const handleAddUrl = (index) => {
    const updatedSections = [...myprofile2.catalogSections];
    updatedSections[index].urls.push({ name: '', url: '' });
    setmyprofile2({ ...myprofile2, catalogSections: updatedSections });
  };

  const handleRemoveUrl = (sectionIndex, urlIndex) => {
    const updatedSections = [...myprofile2.catalogSections];
    updatedSections[sectionIndex].urls.splice(urlIndex, 1);
    setmyprofile2({ ...myprofile2, catalogSections: updatedSections });
  };

  const handleAddSection = () => {
    setmyprofile2({
      ...myprofile2,
      catalogSections: [
        ...myprofile2.catalogSections,
        { title: '', description: '', urls: [{ name: '', url: '' }] }
      ]
    });
  };

  const handleRemoveSection = (index) => {
    const updatedSections = [...myprofile2.catalogSections];
    updatedSections.splice(index, 1);
    setmyprofile2({ ...myprofile2, catalogSections: updatedSections });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getcatalogueupdate(); 
  };

  if (isloading) {
    return <Loading />;
  }
  

  return (
    <div className="container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="text-right">
              <Link to={"/dashboard"}>
                <i className="fa fa-times cancelbutton custom-cancel-btns" aria-hidden="true"></i>
              </Link>
            </div>
            <h1 className="mt-2 mb-5">Edit Catalog</h1>

            <div className="form-group">
              <label htmlFor="company_field">Company Name</label>
              <input
                type="text"
                id="company_field"
                className="form-control"
                name="company"
                value={myprofile2.company}
                onChange={(e) => setmyprofile2({ ...myprofile2, company: e.target.value })}
                required
              />
            </div>

            {myprofile2.catalogSections.map((section, index) => (
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
                    required
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
                    required
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
                        required
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
                        required
                      />
                    </div>

                    <button
                      type="button"
                      className="btn-danger mb-3"
                      onClick={() => handleRemoveUrl(index, urlIndex)}
                    >
                      Remove URL
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn-warning mb-5"
                  onClick={() => handleAddUrl(index)}
                >
                  Add Another URL
                </button>
                <br />
                <button
                  type="button"
                  className="btn-danger mb-2"
                  onClick={() => handleRemoveSection(index)}
                >
                  Remove Title & Description
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddSection}
              className="btn-warning mb-2"
            >
              Add Another Title, Description & URL
            </button>

            <button disabled={isupdate} type="submit" className="btn-success btn-block mt-2">
              Update Catalog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCatalogue;
