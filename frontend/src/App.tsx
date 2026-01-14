import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/login/ui/Page';
import HomePage from '@/pages/home/ui/Page';
import TargetsPage from '@/pages/targets/ui/Page';
import ScansPage from '@/pages/scans/ui/Page';
import VulnerabilitiesPage from '@/pages/vulnerabilities/ui/Page';
import TerminalPage from '@/pages/terminal/ui/Page';
import SettingsPage from '@/pages/settings/ui/Page';
import DashboardLayout from '@/widgets/layout/DashboardLayout';
import { ProtectedRoute } from '@/app/providers/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/targets" element={<TargetsPage />} />
            <Route path="/scans" element={<ScansPage />} />
            <Route path="/vulnerabilities" element={<VulnerabilitiesPage />} />
            <Route path="/terminal" element={<TerminalPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            
            {/* Other routes will go here */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
