import { EarningsCalendarProvider } from '@/context/EarningsCalendarContext';
import { SymbolProvider } from '@/context/SymbolContext';

const DashboardProvider = ({ children }) => {
    return (
        <SymbolProvider> {/* Wrap everything in SymbolProvider */}
            <EarningsCalendarProvider> {/* EarningsCalendarProvider will consume the global symbol */}
                {children}
            </EarningsCalendarProvider>
        </SymbolProvider>
    );
};

export default DashboardProvider;
