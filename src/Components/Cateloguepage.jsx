
import React, { useContext } from 'react';
import createusercontextdata from '../Context/Contextcreated';
import Loading from './Loading';
import { Link } from 'react-router-dom';

const Cateloguepage = () => {
  const {
    isloading,
    allcatalogue,
    setmyprofile2,
    deletecatalogue,
    setallcatalogue,
    record,
  } = useContext(createusercontextdata);

  const filtersdata = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === '') {
      setallcatalogue(record);
    } else {
      const filteredRecords = record.filter((f) =>
        f.company.toLowerCase().includes(searchValue)
      );
      setallcatalogue(filteredRecords);
    }
  };

  const shareLink = (id, company) => {
    const shareUrl = `${window.location.origin}/${company}/${id}`;
    if (navigator.share) {
      navigator
        .share({
          title: `Check out this item: ${company}`,
          url: shareUrl,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  };

  if (isloading) {
    return <Loading />;
  }

  if (!allcatalogue) {
    return <div className='nodatamessege'>No data found!</div>;
}

if (allcatalogue.length==0) {
  return <div className='nodatamessege'>Please add new catalog!</div>;
}


  return (
    <div className='pt-5'>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mt-4">
            <h1 className="mainheading">CATALOG</h1>
          </div>
          <div className="col-12 col-md-6">
            <p className="totalcatalog">Total Catalogue: {allcatalogue.length}</p>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search"
              onChange={filtersdata}
              style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            />
          </div>
       

      
          <table className='col-12' style={{overflowY: 'auto' }}>
            <thead>
              <tr >
                <th className='pt-2' scope="col">No.</th>
                <th className='pt-2' scope="col">COMPANY</th>
                <th className='pt-2' scope="col">PRODUCTS</th>
                <th className='pt-2' scope="col">SHARE</th>
                <th className='pt-2' scope="col">EDIT</th>
                <th  className='pt-2' scope="col">DELETE</th>
              </tr>
            </thead>
            <tbody>
              {allcatalogue.map((result, index) => {
                let catalogSections = [];
                try {
                  catalogSections = JSON.parse(result.catalogSections);
                } catch (error) {
                  console.error('Error parsing catalogSections', error);
                  return (
                    <tr key={index}>
                      <td colSpan="6">Error loading catalog sections</td>
                    </tr>
                  );
                }

                return (
                  <tr key={result.id || index}>
                    <th scope="row">{index + 1}</th>
                    <td className="">{result.company}</td>
                    <td className="">
                      {catalogSections.map((maindata, idx) => (
                        <div key={idx} className="detailscontainer p-3 mb-3 mt-3">
                            <strong className=''>{idx + 1}. {maindata?.title || 'No title'}</strong><br/>
                      
                          <span className='pt-3 d-block'><strong>Description: </strong>{maindata?.description || 'No description'}</span>
                          <span>
                            {maindata.urls.map((url, ind) => (
                              <span key={ind} className='d-block mt-2'>
                                <li><a href={url.url} target="_blank" rel="noopener noreferrer">
                                {url.name}
                                </a></li> 
                               
                              </span>
                            ))}
                          </span>
                        </div>
                      ))}
                    </td>

                    <td>
                      <button
                        onClick={() => shareLink(result.id, result.company)}
                        className="btn btn-info btn-sm"
                      >
                        Share
                      </button>
                    </td>
                    <td>
                      <Link to="/edit">
                        <button
                          onClick={() =>
                            setmyprofile2({
                              id: result.id,
                              company: result.company,
                              catalogSections: catalogSections,
                            })
                          }
                          className="btn btn-primary btn-sm"
                        >
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => deletecatalogue(result.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      </div>
  );
};

export default Cateloguepage;


