"use client"

import { MenuBar } from "@/components/menu-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from 'react';

interface Quiz {
  id: string;
  name: string;
}

export default function Page() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch('/api/quizzes');
        const data = await res.json();
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="mb-[120px]">
        <ThemeToggle />
      </div>
      <MenuBar />
      {/* Placeholder for Quiz List */}
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Quizzes Existentes</h2>
        {
          loading ? (
            <p>Cargando quizzes...</p>
          ) : quizzes.length > 0 ? (
            <ul className="list-disc list-inside">
              {quizzes.map((quiz) => (
                <li key={quiz.id} className="text-foreground">
                  {quiz.name} ({quiz.id})
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay quizzes disponibles.</p>
          )
        }
      </div>
    </div>
  )
}
