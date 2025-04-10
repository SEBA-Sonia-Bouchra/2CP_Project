export default function ProjectCard({ title = "Untitled", image, description = "No description available" }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <img
        src={image || "/placeholder.jpg"}
        alt={title}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
