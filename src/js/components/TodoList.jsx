import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const TodoList = () => {
	const [input, setInput] = useState("");
	const [lista, setLista] = useState([]);
	const API_URL = "https://playground.4geeks.com/todo";
	const USERNAME = "Jon"; // Cambia esto por tu usuario real

	// 1. Verifica si el usuario existe
	const verificarUsuario = async () => {
		try {
			const response = await fetch(`${API_URL}/users/${USERNAME}`);
			if (!response.ok) {
				await crearUsuario();
			} else {
				obtenerTareas();
			}
		} catch (error) {
		}
	};

	// 2. Crea usuario si no existe
	const crearUsuario = async () => {
		try {
			const response = await fetch(`${API_URL}/users/${USERNAME}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				obtenerTareas();
			} else {
			}
		} catch (error) {

		}
	};

	// 3. Obtiene las tareas actuales
	const obtenerTareas = async () => {
		try {
			const response = await fetch(`${API_URL}/users/${USERNAME}`);
			if (response.ok) {
				const data = await response.json();
				setLista(data.todos);
			} else {
			}
		} catch (error) {
		}
	};

	// 4. Agrega una tarea
	const agregarTarea = async () => {
		if (!input.trim()) return;
		try {
			const response = await fetch(`${API_URL}/todos/${USERNAME}`, {
				method: "POST",
				body: JSON.stringify({
					label: input,
					is_done: false
				}),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				obtenerTareas();
				setInput("");
			} else {
			}
		} catch (error) {
		}
	};

	const eliminarTarea = async (id) => {
		try {
			const response = await fetch(`${API_URL}/todos/${id}`, {
				method: "DELETE"
			});
			if (response.ok) {
				const nuevaLista = lista.filter((tarea) => tarea.id !== id);
				setLista(nuevaLista);
			} else {
			}
		} catch (error) {
		}
	};

	useEffect(() => {
		verificarUsuario();
	}, []);

	return (
		<div
			className="container py-5"
			style={{
				maxWidth: "600px",
				fontFamily: "'Segoe UI', sans-serif",
				color: "#333",
			}}
		>
			<h2 className="text-center mb-4 fw-light" style={{ color: "#222" }}>
				My Tasks
			</h2>

			<div className="mb-4">
				<input
					className="form-control border-0 border-bottom rounded-0 px-1"
					style={{
						boxShadow: "none",
						borderColor: "#ccc",
						fontSize: "1.1rem",
					}}
					type="text"
					placeholder="What do you need to do?"
					onChange={(e) => setInput(e.target.value)}
					value={input}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							agregarTarea();
						}
					}}
				/>
			</div>

			<ul className="list-group list-group-flush">
				{lista.map((t, index) => (
					<li
						key={t.id}
						className="list-group-item d-flex justify-content-between align-items-center px-0 py-2"
						style={{
							borderBottom: "1px solid #eee",
							backgroundColor: "transparent",
						}}
					>
						<span style={{ fontSize: "1rem" }}>{t.label}</span>
						<FontAwesomeIcon
							icon={faTrashAlt}
							className="text-secondary"
							style={{
								cursor: "pointer",
								transition: "color 0.2s ease-in-out",
							}}
							onMouseOver={(e) => (e.currentTarget.style.color = "#dc3545")}
							onMouseOut={(e) => (e.currentTarget.style.color = "#6c757d")}
							onClick={() => eliminarTarea(t.id)}
						/>
					</li>
				))}
			</ul>

			<div className="text-end text-muted mt-3" style={{ fontSize: "0.9rem" }}>
				{lista.length > 0
					? `${lista.length} ${lista.length === 1 ? "task" : "tasks"}`
					: "No tasks yet."}
			</div>
		</div>
	);
};

export default TodoList;









