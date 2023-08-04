import { createClient } from '@supabase/supabase-js'
import React from 'react'
import {Auth,} from '@supabase/auth-ui-react'
import { ThemeSupa,} from '@supabase/auth-ui-shared'

export const supabase = createClient(
  'https://ltgujeratrvrttpqnfoe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0Z3VqZXJhdHJ2cnR0cHFuZm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTExNTYwNTcsImV4cCI6MjAwNjczMjA1N30.rYLMXsNXhE5UXJS7E2IEW3BuiQ4J9ERtC5jwdaYJ8YU'
)

export default function Sign() {
 
  return (

    <div>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
      />
      
    </div>


  );
}
