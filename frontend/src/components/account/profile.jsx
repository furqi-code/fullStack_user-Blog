import { useState, useRef, useEffect } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Sidebar from "./sidebar";
import axios from "axios";

const Profile = () => {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const bioRef = useRef(null);
  const locationRef = useRef(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:1111/account/profile",
      headers: {
        Authorization: localStorage.getItem("userDetail"),
      },
    })
      .then((res) => {
        const { Email, username, Bio, location } = res.data.info;
        if (emailRef.current) emailRef.current.value = Email;
        if (usernameRef.current) usernameRef.current.value = username;
        if (bioRef.current) bioRef.current.value = Bio || "";
        if (locationRef.current) locationRef.current.value = location || "";
      })
      .catch((err) => {
        console.log("Couldn't fetch user profile", err);
        setError("Failed to load profile data.");
      });
  }, []);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const bio = bioRef.current.value;
    const location = locationRef.current.value;
    axios({
      method: "PATCH",
      url: "http://localhost:1111/account/profile",
      headers: {
        Authorization: localStorage.getItem("userDetail"),
      },
      data: {
        email,
        username,
        location,
        bio,
      },
    })
      .then((res) => {
        console.log("Profile updated", res.data.message);
        setSuccess("Profile updated successfully.");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      })
      .catch((err) => {
        console.log("Update error", err);
        setError("Failed to update profile.");
      });
  };

  return (
    <>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <Sidebar/>

            {/* Main Content */}
            <main className="flex-1">
              <div className="space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Profile Information
                  </h3>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="aspect-square w-full max-w-[200px] mx-auto relative">
                        <img
                          src="https://res.cloudinary.com/dgcqtwfbj/image/upload/w_450/v1756797851/portrait-787522_1280_p6fluq.jpg"
                          alt="Profile pic"
                          className="rounded-full w-full h-full object-cover"
                        />
                        <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50">
                          <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <form onSubmit={handleSaveChanges} className="space-y-4">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email Address
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            ref={emailRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                              focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color
                              disabled:bg-gray-50 disabled:text-gray-500"
                            placeholder="you@example.com"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Username
                          </label>
                          <input
                            id="username"
                            name="username"
                            type="text"
                            ref={usernameRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                              focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                            placeholder="Enter your username"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="bio"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Bio
                          </label>
                          <textarea
                            id="bio"
                            name="bio"
                            rows={3}
                            ref={bioRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                              focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                            placeholder="Write a few sentences about yourself"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Brief description for your profile
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Location
                          </label>
                          <input
                            id="location"
                            name="location"
                            type="text"
                            ref={locationRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                              focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                            placeholder="City, Country"
                          />
                        </div>

                        {error && (
                          <p className="text-red-500 text-sm mt-2 font-semibold">
                            {error}
                          </p>
                        )}
                        {success && (
                          <p className="text-green-500 text-sm mt-2 font-semibold">
                            {success}
                          </p>
                        )}

                        <div className="pt-4">
                          <button
                            type="submit"
                            className="bg-primary-color px-4 py-2 rounded-md hover:bg-secondary-color focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Account Statistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Posts</p>
                      <p className="text-2xl font-semibold text-gray-900">24</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Comments</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        142
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Joined</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        5 Aug, 2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
