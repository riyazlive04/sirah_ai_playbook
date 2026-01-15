-- Add explicit SELECT policy to protect lead data
CREATE POLICY "Only service role can read leads" 
ON public.leads 
FOR SELECT 
USING (auth.role() = 'service_role'::text);