//1 import area
import React, { useEffect, useState } from 'react';


//2 function defination

function App() {
  //2.1 hook/variables
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ashi",
      createdAt: '1234445'
    },
    {
      id: 2,
      name: "Dipa",
      createdAt: '19999090909'
    }
  ])

  const [stuname,setStuname]=useState('');

  useEffect(() => {
    //call the api
    fetch('http://localhost:1337/api/students', { method: "GET" })
      .then((res) => { return res.json() })
      .then((data) => { 
        console.log(data.data)
        let newobj=data.data.map((cv,index,arr)=>{
          return {
            id:cv.id,
            name:cv.attributes.name,
            createdAt:cv.attributes.createdAt
          }
        })
        setStudents(newobj);
       })
      .catch((err) => { console.log(err) })
  }, [])

  //2.2 function defination area
  let deleteStudents=(e)=>
  { document.getElementById('loader').innerHTML=`<div class="d-flex justify-content-center">
                                                      <div class="spinner-border" role="status">
                                                        <span class="visually-hidden">Loading...</span>
                                                      </div>
                                                  </div>`
    
    console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML);
    let delid=e.target.closest('tr').querySelector('td:first-child').innerHTML;
    let x=e.target.closest('tr');
    // alert('okkk');
    let con=window.confirm("Are you really want to delete Students ?");
    console.log(con);
    if(con===true)
    { 
      console.log('okk');
      // call the delete api
      fetch(`http://localhost:1337/api/students/${delid}`,{method:"DELETE"})
      .then((res)=>{return res.json()})
      .then((data)=>{
        console.log(data);
        document.getElementById('loader').innerHTML='';
        x.remove();
        window.alert('Deleted successfully');
      })
      .catch((err)=>{console.log(err)})
    }
    else{
      console.log('not okk');
      document.getElementById('loader').innerHTML='';
    }
  }

  let sendData=()=>{
    // console.log('okk');
    console.log(stuname);
    let data={
      "data": {
        "name": stuname
      }
    }
    //call the api
    fetch(`http://localhost:1337/api/students`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res)=>{return res.json()})
    .then((data)=>{
      console.log(data.data)
      if(data)
      {
        alert('Student Created Successfully');
      }
    })
    .catch((err)=>{console.log(err)})
  }


  //2.3 return statement
  return (
    <>

      <div className='container'>
        <form>
          <div className="mb-3">
            <h1>Create Students</h1>
            <label htmlFor="student_name" className="form-label">Student Name</label>
            <input type="text" name='student_name' id="student_name" className="form-control" value={stuname} onChange={(e)=>{setStuname(e.target.value)}} />
          </div>
          <button type="button" className="btn btn-primary" onClick={()=>{sendData()}}>Submit</button>
        </form>
        <br />
        <br />
        <br />
        <hr />
        <br />
        <br />
        <br />

        <div id="loader">
      
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">CreatedAt</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map((cv, index, arr) => {
                return <tr>
                  <td>{cv.id }</td>
                  <td>{cv.name }</td>
                  <td>{cv.createdAt}</td>
                  <td>
                    <button className='btn btn-success btn-sm'>View</button>
                    <button className='btn btn-primary btn-sm'>Edit</button>
                    <button className='btn btn-danger btn-sm' onClick={(e)=>{deleteStudents(e)}}>Delete</button>
                  </td>
                </tr>

              })
            }

          </tbody>
        </table>

      </div>
    </>
  );
}


//3 export area
export default App;
