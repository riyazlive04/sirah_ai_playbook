-- Add explicit policies to deny UPDATE and DELETE for non-service-role users
CREATE POLICY "Only service role can update leads" 
ON public.leads 
FOR UPDATE 
USING (auth.role() = 'service_role'::text);

CREATE POLICY "Only service role can delete leads" 
ON public.leads 
FOR DELETE 
USING (auth.role() = 'service_role'::text);