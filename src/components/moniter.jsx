import  { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {
  const [monitors, setMonitors] = useState([]);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [newMonitorData, setNewMonitorData] = useState({
    message: '',
    name: '',
    query: '',
    type: '',
  });
  const [webhookData, setWebhookData] = useState([]);

  useEffect(() => {
    // Fetch monitors from DataDog API
    const fetchMonitors = async () => {
      try {
        const response = await axios.get('https://api.datadoghq.com/v1/monitor');
        setMonitors(response.data.monitors);
      } catch (error) {
        console.error('Error fetching monitors:', error);
      }
    };

    // Fetch webhook data
    const fetchWebhookData = async () => {
      try {
        const response = await axios.get('https://balajik.com/webhook');
        setWebhookData(response.data);
      } catch (error) {
        console.error('Error fetching webhook data:', error);
      }
    };

    fetchMonitors();
    fetchWebhookData();
  }, []);

  const handleCreateFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://api.datadoghq.com/v1/monitor', newMonitorData);
      setMonitors([...monitors, response.data]);
      setCreateFormVisible(false);
      setNewMonitorData({
        message: '',
        name: '',
        query: '',
        type: '',
      });
    } catch (error) {
      console.error('Error creating monitor:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMonitorData({
      ...newMonitorData,
      [name]: value,
    });
  };

  return (
    <>
    <div className='App'>
       
      <div className="navbar bg-blue-100 m-2 ">
        <div className="flex-1">
          <a className="btn btn-ghost  text-xl font-bold ">Moniter</a>
        </div>
        </div>
     
      <button onClick={() => setCreateFormVisible(true)} className='btn btn-ghost bg-primary text-xl font-bold'>Create New Monitor</button>
      
      {createFormVisible && (
        <form onSubmit={handleCreateFormSubmit}>
          <div>
            <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">Message:</label>
            <input type="text" id="message" name="message" value={newMonitorData.message} onChange={handleInputChange} 
             className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 "/>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
            <input type="text" id="name" name="name" value={newMonitorData.name} onChange={handleInputChange} 
             className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 "/>
          </div>
          <div>
            <label htmlFor="query" className="block text-sm font-medium leading-6 text-gray-900">Query:</label>
            <input type="text" id="query" name="query" value={newMonitorData.query} onChange={handleInputChange}
            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 "
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">Type:</label>
            <input type="text" id="type" name="type" value={newMonitorData.type} onChange={handleInputChange}
             className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 " />
          </div>
          <button type="submit" className='btn btn-ghost bg-primary text-xl font-bold'>Create Monitor</button>
        </form>
      )}
      <br></br><br></br><br></br>
      <div className='overflow-x-auto'>
      <h2>Monitors</h2>
      <br></br><br></br><br></br><br></br>
      
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Last Triggered</th>
          </tr>
        </thead>
        <tbody>
          {monitors.map((monitor) => (
            <tr key={monitor.id}>
              <td>{monitor.name}</td>
              <td>{monitor.status}</td>
              <td>{monitor.last_triggered}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br><br></br><br></br><br></br>
      <h2>Webhook Data</h2>
      <ul>
        {webhookData.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
    </div>
    </div>
    <br></br><br></br><br></br><br></br><br></br><br></br>
    </>
  );
};

export default App;
