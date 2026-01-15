-- Create storage bucket for playbook PDF
INSERT INTO storage.buckets (id, name, public) VALUES ('playbooks', 'playbooks', true);

-- Allow public read access to playbooks
CREATE POLICY "Anyone can read playbooks"
ON storage.objects
FOR SELECT
USING (bucket_id = 'playbooks');

-- Allow authenticated admins to upload playbooks (service role)
CREATE POLICY "Service role can manage playbooks"
ON storage.objects
FOR ALL
USING (bucket_id = 'playbooks' AND auth.role() = 'service_role');