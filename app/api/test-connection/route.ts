import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data, error } = await supabase.from('subjects').select('*').limit(1)
    
    if (error) throw error
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected successfully',
      data 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 })
  }
}