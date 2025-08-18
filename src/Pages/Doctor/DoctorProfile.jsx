import React, { useContext, useState } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { doctorProfile, setDoctorProfile, updateDoctorProfile } =
    useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(doctorProfile);
  const [image, setImage] = useState(false);

  const handleSave = async () => {
    const updatedProfile = { ...editData };
    if (image) {
      updatedProfile.image = URL.createObjectURL(image);
    }
    const success = await updateDoctorProfile(updatedProfile);
    if (success) {
      setDoctorProfile(updatedProfile);
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Something went wrong!");
    }
    setIsEdit(false);
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-5xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Profile image */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <label htmlFor="image" className="cursor-pointer">
            <img
              className="w-40 h-40 bg-blue-200 shadow-md p-4 rounded-xl object-cover mb-4"
              src={image ? URL.createObjectURL(image) : doctorProfile.image}
              alt="Doctor"
            />
            {isEdit && (
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            )}
          </label>
        </div>

        {/* Profile fields */}
        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {[
            ["Name", "name"],
            ["Email", "email"],
            ["Speciality", "speciality"],
            ["Degree", "degree"],
            ["Experience", "experience"],
            ["Fees (₹)", "fees"],
          ].map(([label, field]) => (
            <div key={field} className="flex flex-col">
              <label className="block font-semibold mb-1">{label}</label>
              {isEdit ? (
                <input
                  type="text"
                  value={editData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="w-full border p-2 rounded"
                />
              ) : (
                <p>{doctorProfile[field]}</p>
              )}
            </div>
          ))}

          {/* Availability */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Available?</label>
            {isEdit ? (
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={editData.available}
                  onChange={(e) =>
                    handleChange("available", e.target.checked)
                  }
                />
                <span>{editData.available ? "Available" : "Not Available"}</span>
              </div>
            ) : (
              <p>{doctorProfile.available ? "Available" : "Not Available"}</p>
            )}
          </div>

          {/* Address */}
          <div className="col-span-2 flex flex-col">
            <label className="font-semibold mb-1">Address Line 1</label>
            {isEdit ? (
              <input
                type="text"
                value={editData.address.line1}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    address: {
                      ...editData.address,
                      line1: e.target.value,
                    },
                  })
                }
                className="w-full border p-2 rounded"
              />
            ) : (
              <p>{doctorProfile.address?.line1}</p>
            )}
          </div>
          <div className="col-span-2 flex flex-col">
            <label className="font-semibold mb-1">Address Line 2</label>
            {isEdit ? (
              <input
                type="text"
                value={editData.address.line2}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    address: {
                      ...editData.address,
                      line2: e.target.value,
                    },
                  })
                }
                className="w-full border p-2 rounded"
              />
            ) : (
              <p>{doctorProfile.address?.line2}</p>
            )}
          </div>

          {/* About */}
          <div className="col-span-2 flex flex-col">
            <label className="font-semibold">About</label>
            {isEdit ? (
              <textarea
                rows={3}
                value={editData.about}
                onChange={(e) => handleChange("about", e.target.value)}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p>{doctorProfile.about}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 mt-6 justify-end">
        {isEdit ? (
          <>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
              onClick={() => {
                setIsEdit(false);
                setEditData(doctorProfile);
                setImage(null);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              setIsEdit(true);
              setEditData(doctorProfile);
            }}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;

