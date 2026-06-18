import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile } from "../../api/profileApi";

export default function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const profileFields = [
    user?.headline,
    user?.bio,
    user?.githubUsername,
    user?.linkedinUrl,
    user?.portfolioUrl,
    user?.skills?.length > 0,
  ];

  const completedFields = profileFields.filter(Boolean).length;

  const completionPercentage = Math.round(
    (completedFields / profileFields.length) * 100
  );

  const [formData, setFormData] = useState({
    headline: user?.headline || "",
    bio: user?.bio || "",
    githubUsername: user?.githubUsername || "",
    linkedinUrl: user?.linkedinUrl || "",
    portfolioUrl: user?.portfolioUrl || "",
    skills: user?.skills?.join(", ") || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSaving(true);

      const payload = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const response = await updateProfile(payload);

      setUser(response.data);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Profile Settings
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your public developer information.
          </p>
        </div>



        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="
                            px-5 py-2
                            rounded-lg
                            bg-red-400
                            text-black
                            font-semibold
                            hover:bg-red-300
                            transition
                        "
          >
            ✎ Edit Profile
          </button>
        )}
      </div>

      {!isEditing && (<div
        className="
        mb-8
        rounded-2xl
        border border-white/10
        bg-gray-950/40
        backdrop-blur-md
        p-6
    "
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-md font-semibold text-white">
            Profile Completion
          </h2>

          <span className="text-red-400 font-semibold">
            {completionPercentage}%
          </span>
        </div>

        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-red-400 transition-all duration-500"
            style={{
              width: `${completionPercentage}%`,
            }}
          />
        </div>
        <div className="grid grid-cols-2 ">
          <div className="mt-4 space-y-2 text-sm">
            <p className={user?.headline ? "text-green-400" : "text-gray-400"}>
              {user?.headline ? "✓" : "○"} Headline
            </p>

            <p className={user?.bio ? "text-green-400" : "text-gray-400"}>
              {user?.bio ? "✓" : "○"} Bio
            </p>

            <p className={user?.githubUsername ? "text-green-400" : "text-gray-400"}>
              {user?.githubUsername ? "✓" : "○"} GitHub Username
            </p>

          </div>
          <div className="mt-4 space-y-2 text-sm">
            <p className={user?.linkedinUrl ? "text-green-400" : "text-gray-400"}>
              {user?.linkedinUrl ? "✓" : "○"} LinkedIn URL
            </p>

            <p className={user?.portfolioUrl ? "text-green-400" : "text-gray-400"}>
              {user?.portfolioUrl ? "✓" : "○"} Portfolio URL
            </p>

            <p className={user?.skills?.length ? "text-green-400" : "text-gray-400"}>
              {user?.skills?.length ? "✓" : "○"} Skills
            </p></div>
        </div>
      </div>
      )}


      {successMessage && (
        <div
          className="
            mb-6
            rounded-lg
            border border-green-500/30
            bg-green-500/20
            px-4 py-3
            text-green-400
        "
        >
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="
                    rounded-2xl
                    border border-white/10
                    bg-gray-950/40
                    backdrop-blur-md
                    p-8
                    space-y-6
                "
      >

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Name
            </label>

            <input
              value={user?.name || ""}
              disabled
              className="
                                w-full
                                rounded-lg
                                border border-white/10
                                bg-white/5
                                px-4 py-3
                                text-gray-400
                            "
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email
            </label>

            <input
              value={user?.email || ""}
              disabled
              className="
                                w-full
                                rounded-lg
                                border border-white/10
                                bg-white/5
                                px-4 py-3
                                text-gray-400
                            "
            />
          </div>

        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Headline
          </label>

          <input
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            disabled={!isEditing}
            className="
                            w-full
                            rounded-lg
                            border border-white/10
                            bg-white/5
                            px-4 py-3
                            text-white
                            disabled:opacity-60
                        "
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Bio
          </label>

          <textarea
            rows="5"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            disabled={!isEditing}
            className="
                            w-full
                            rounded-lg
                            border border-white/10
                            bg-white/5
                            px-4 py-3
                            text-white
                            disabled:opacity-60
                        "
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              GitHub Username
            </label>

            <input
              type="text"
              name="githubUsername"
              value={formData.githubUsername}
              onChange={handleChange}
              disabled={!isEditing}
              className="
                                w-full
                                rounded-lg
                                border border-white/10
                                bg-white/5
                                px-4 py-3
                                text-white
                                disabled:opacity-60
                            "
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              LinkedIn URL
            </label>

            <input
              type="text"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              disabled={!isEditing}
              className="
                                w-full
                                rounded-lg
                                border border-white/10
                                bg-white/5
                                px-4 py-3
                                text-white
                                disabled:opacity-60
                            "
            />
          </div>

        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Portfolio URL
          </label>

          <input
            type="text"
            name="portfolioUrl"
            value={formData.portfolioUrl}
            onChange={handleChange}
            disabled={!isEditing}
            className="
                            w-full
                            rounded-lg
                            border border-white/10
                            bg-white/5
                            px-4 py-3
                            text-white
                            disabled:opacity-60
                        "
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Skills
          </label>

          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="React, Node.js, MongoDB"
            className="
                            w-full
                            rounded-lg
                            border border-white/10
                            bg-white/5
                            px-4 py-3
                            text-white
                            disabled:opacity-60
                        "
          />
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() => {
                setFormData({
                  headline: user?.headline || "",
                  bio: user?.bio || "",
                  githubUsername: user?.githubUsername || "",
                  linkedinUrl: user?.linkedinUrl || "",
                  portfolioUrl: user?.portfolioUrl || "",
                  skills: user?.skills?.join(", ") || "",
                });

                setIsEditing(false);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="
                px-3 py-2
                rounded-lg
                border border-white/10
                text-white
                hover:border-white/30
            "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="
                px-3 py-2
                rounded-lg
                bg-red-400
                text-black
                font-semibold
                hover:bg-red-300
                transition
            "
            >
              {isSaving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>
        )}

      </form>

    </section>
  );
}