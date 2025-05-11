import React, {useState, useEffect } from 'react';
import FileTickIcon from '../assets/images/file-tick.svg'
import NoAccounts from '../components/NoAccounts';
import axios from 'axios';

const AccountsPage = () => {
    const [Accounts, setAccounts] = useState([]);

    useEffect(() => {
      const fetchAccountsAndCertificates = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/auth/pending-users');
          const data = await res.json();
    
          // Fetch certificates for expert users only
          const accountsWithCertificates = await Promise.all(
            data.map(async (account) => {
              if (account.isProfessional) {
                try {
                  const res = await axios.post("http://localhost:5000/api/auth/get-certificate", {
                    userId: account._id,
                  });
                  return { ...account, certificateUrl: res.data.certificateUrl };
                } catch (err) {
                  console.warn(`No certificate for user ${account._id}`);
                  return { ...account, certificateUrl: null };
                }
              } else {
                return account;
              }
            })
          );
          
          
          setAccounts(accountsWithCertificates);
        } catch (err) {
          console.error("Failed to fetch accounts or certificates:", err);
        }
      };
      
      fetchAccountsAndCertificates();
    }, []);

    const updateStatus = (id, action) => {
      const token = sessionStorage.getItem("token"); 
      fetch(`http://localhost:5000/api/auth/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ userId: id, action }),
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to update");
          setAccounts(prev => prev.filter(account => account._id !== id));
        })
        .catch(err => console.error("Error updating status:", err));
    };
   

  return (
    <>
    <div className="flex justify-center min-h-screen bg-[#fffcf4] pt-12 pb-28 font-montserral">
      {Accounts.length > 0 ? (
      <div className="w-3/4">
        {Accounts.map((account) => (
          <div
            key={account._id}
            className='p-4 bg-[#FFF8E3] flex w-full flex-col mb-5 shadow-md rounded-lg' >
            <div className="flex flex-row justify-between items-end">
                <p> <strong className='font-semibold'>{account.firstname} {account.lastname} </strong>wants to create an acount.</p>
              
              {account.isProfessional == false &&
                <span className='text-gray-500 text-sm'>Normal user</span>
              }
              {account.isProfessional == true &&
                <span className='text-gray-500 text-sm'>Expert user</span>
              }
            </div>

            <a href={`mailto:${account.email}`} className='underline hover:text-blue-800'>
              {account.email}
            </a>
            <p className="mt-1 text-xs text-gray-500">{new Date(account.createdAt).toLocaleDateString()}</p>
                

              {/* Buttons Section */}
              <div className="flex flex-col  items-end ">

              <div className="space-x-2">
                {account.isProfessional === false && (
                  <>
                    <button className="px-5 pt-1 pb-1 shadow-md bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]"
                    onClick={() => {updateStatus(account._id, "reject"); }}>
                      Refuse
                    </button>
                    <button className="px-5 pt-1 pb-1 shadow-md bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]"
                    onClick={() => {updateStatus(account._id, "accept");}}>
                      Accept
                    </button>
                  </>
                )}
                {/* add this certificate file if the user is pro */}
                {account.isProfessional === true && (
                  <>
                    {account.certificateUrl ? (
                      <a href={account.certificateUrl} target="_blank" rel="noopener noreferrer">
                        <button
                          className="px-5 pt-1 pb-1 shadow-sm text-[#213824CC] text-base rounded-full hover:text-[#21382499] border border-[#213824CC] hover:border-[#21382499]"
                            onClick={() => {
                              if (!account.certificateUrl) {
                                alert("No certificate available!");
                              }
                            }}
                        >
                          <div className="flex gap-2 items-center">
                            <img src={FileTickIcon} alt="file tick icon" />
                            <span>See identification file</span>
                          </div>
                        </button>
                      </a>
                    ) : (
                      <p>No certificate found.</p>
                    )}

                    <button className="px-5 pt-1 pb-1 shadow-md bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]"
                    onClick={() => {updateStatus(account._id, "reject"); }}>
                      Refuse
                    </button>
                    <button className="px-5 pt-1 pb-1 shadow-md bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]"
                     onClick={() => {updateStatus(account._id, "accept"); }}>
                      Accept
                    </button>
                  </>
                )}
              </div>
            </div>
          </div> 
        ))}
      </div>
      ) : (
        <NoAccounts />
      )}
    </div>
    </>
  )
}


export default AccountsPage