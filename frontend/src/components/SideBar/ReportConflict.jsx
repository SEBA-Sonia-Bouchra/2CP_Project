import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import icon from '../../assets/images/icon-placeholder.png';
import useCurrentUser from '../../utils/useCurrentUser';
import axios from 'axios';

const ReportConflict = ({ setReportConflict, annotation, project }) => {
  const localhost = "http://localhost:5000";
  const user = useCurrentUser();
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [contributor, setContributor] = useState(null);

  useEffect(() => {
    const fetchContributorInfo = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(
          `${localhost}/api/annotations/project/${project._id}/section/${annotation.sectionId}/contributor`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.contributor); // Check if contributor data is correctly received
        setContributor(response.data.contributor);
      } catch (err) {
        setErrorMsg('Failed to fetch contributor info.');
        console.error(err);
      }
    };
  
    if (annotation?.sectionId && project?._id) {
      fetchContributorInfo();
    }
  }, [annotation?.sectionId, project?._id]);
  

  const handleReport = async () => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post(
        `${localhost}/api/conflict/report`,
        {
          projectId: project._id,
          sectionId: annotation.sectionId,
          annotationId: annotation._id,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMsg(response.data.message);
      setTimeout(() => setReportConflict(false), 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Failed to report conflict.');
    } finally {
      setLoading(false);
    }
  };
  console.log(project.author?._id)
  console.log(annotation?.user)
  console.log(contributor?._id)

  return (
    <div className="fixed left-0 top-0 w-full flex items-center justify-center h-screen bg-black bg-opacity-25 z-30">
      <div className="bg-white rounded-md lg:w-1/2 max-w-lg p-4">
        <h3 className="text-center mb-6 text-lg font-medium">Conflict Resolution</h3>

        <div className="text-sm mb-6 px-2">
          <p className="mb-2">Send an email to:</p>
          <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center">
            {(project.author?._id !== annotation?.user && project.author?._id !== contributor?._id) && (
              <>
                <Link to={`/see-profile/${project.author?._id}`}>
                  <img
                    src={project.author.profilePicture ? `${localhost}${project.author.profilePicture}` : icon}
                    alt="User Profile"
                    className="rounded-full h-6 w-6 object-cover object-center cursor-pointer"
                    />
                </Link>
                <Link to={`/see-profile/${project.author?._id}`}>
                  <p className="hover:underline truncate max-w-[200px] whitespace-nowrap cursor-pointer">
                    {project.author.firstname} {project.author.lastname}
                  </p>
                </Link>
                <span className="text-left text-xs text-gray-600">Project owner</span>
              </>
            )}

            {(contributor?._id !== annotation.user) && (
              <>
                <Link to={`/see-profile/${contributor?._id}`}>
                <img
                  src={contributor?.profilePicture ? `${localhost}${contributor?.profilePicture}` : icon}
                  alt="Contributor Profile"
                  className="rounded-full h-6 w-6 object-cover object-center"
                  />
                </Link>
                <Link to={`/see-profile/${contributor?._id}`}>
                <p className="hover:underline truncate max-w-[200px] whitespace-nowrap">
                  {contributor?.firstname} {contributor?.lastname}
                </p>
                </Link>
                <span className="text-left text-xs text-gray-600">Section contributor</span>
              </>
            )}
            <Link to={`/see-profile/${annotation.user}`}>
                <img
                  src={annotation.profilePicture ? `${localhost}${annotation.profilePicture}` : icon}
                  alt="Annotator profile picture"
                  className="rounded-full h-6 w-6 object-cover object-center"
                  />
            </Link>
            <Link to={`/see-profile/${annotation.user}`}>
                <p className="hover:underline truncate max-w-[200px] whitespace-nowrap">
                  {annotation.firstname} {annotation.lastname}
                </p>
            </Link>
                <span className="text-left text-xs text-gray-600">Annotation writer</span>
          </div>
        </div>

        <textarea
          className="w-full border p-2 text-sm mb-3 rounded resize-none outline-none"
          placeholder="Describe the reason for the conflict..."
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        {errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-sm mb-2">{successMsg}</p>}

        <div className="flex justify-center gap-3">
          <button
            className="border-[#4F3726] border text-[#4F3726] px-5 py-2 rounded-full text-sm hover:bg-gray-50 shadow-sm"
            onClick={() => setReportConflict(false)}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-[#4F3726] text-white px-5 py-2 rounded-full text-sm shadow-md"
            onClick={handleReport}
            disabled={loading || !reason.trim()}
          >
            {loading ? 'Sending...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportConflict;
