import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// API route to fetch quizzes from the database
export async function GET() {
  try {
    // Fetch quizzes from the database
    const quizzes = await prisma.quiz.findMany();

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json({ error: 'Failed to fetch quizzes' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}