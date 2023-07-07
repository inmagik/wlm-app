import range from 'lodash/range';


const bigRange = range(100);


export default function HomePage() {
  return <div className="bg-primary h-100 w-100 d-flex flex-column overflow-hidden">
    <div className='bg-dark'>
        <input className="form-control m-1" type="text" placeholder="Search" aria-label="Search"/>
    </div>
    <div className='bg-danger'>
        <select className="form-control m-1" aria-label="Default select example">
            {bigRange.map((i:number) => <option key={i} value={i}>Option {i}</option>)}
        </select>
    </div>
    <div style={{flex:1}} className='overflow-auto'>
        {bigRange.map((i:number) => <div key={i} className="card m-2 p-3">
            <span style={{fontSize:12}}>Prova di testo</span>
        </div>)}
    </div>
    <div className='bg-dark'>
        <input className="form-control m-1" type="text" placeholder="Search" aria-label="Search"/>
    </div>




  </div>;
}
