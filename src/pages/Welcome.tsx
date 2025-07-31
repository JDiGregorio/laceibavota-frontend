import { Link } from 'react-router-dom'
import { LucideUserCheck, LucideUsers, LucideUserPlus } from 'lucide-react'

type RolCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    classes: string;
    to: string;
}

const RolCard: React.FC<RolCardProps> = ({ icon, title, description, classes, to }) => {
    return (
        <Link to={to} className={classes}>
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm mt-1">{description}</p>
        </Link>
    )
}

export default function Welcome() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
            <h1 className="text-2xl font-bold mb-2">
                Bienvenido    
            </h1>
            
            <p className="text-gray-500 mb-8">
                Selecciona tu rol para continuar
            </p>

            <div className="flex gap-6 flex-wrap justify-center">
                <RolCard
                    to="/login"
                    icon={<LucideUserCheck size={40} className="text-gray-500" />}
                    title="Coordinador"
                    description="Acceso para administradores y gestores."
					classes="rounded-xl p-6 w-60 text-center pointer-events-none cursor-default bg-gray-200 text-gray-700"
					// classes="rounded-xl p-6 w-60 text-center shadow transition-transform duration-200 hover:scale-105 cursor-pointer bg-blue-100 text-blue-700"
                />

                <RolCard
                    to="/login"
                    icon={<LucideUsers size={40} className="text-blue-500" />}
                    title="Movilizador"
                    description="Ingreso para el equipo de campo."
					classes="rounded-xl p-6 w-60 text-center shadow transition-transform duration-200 hover:scale-105 cursor-pointer bg-gray-100 text-black"
                />

                <RolCard
                    to="invitados"
                    icon={<LucideUserPlus size={40} className="text-gray-500" />}
                    title="Invitado"
                    description="Regístrate para acceder como invitado."
					classes="rounded-xl p-6 w-60 text-center pointer-events-none cursor-default bg-gray-200 text-gray-700"
					// classes="rounded-xl p-6 w-60 text-center shadow transition-transform duration-200 hover:scale-105 cursor-pointer bg-blue-500 text-white"
                />
            </div>
        </div>
    );
}