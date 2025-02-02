import { EarningsCalendarProvider } from '@/context/EarningsCalendarContext';
import { InsiderTransactionsProvider } from '@/context/InsiderTransactionsContext';
import { SymbolProvider } from '@/context/SymbolContext';

const DashboardProvider = ({ children }) => {
    return (
        <SymbolProvider> 
            {/* Wrap everything in SymbolProvider to ensure global access to symbol */}
            <InsiderTransactionsProvider>
                <EarningsCalendarProvider> 
                    {children}
                </EarningsCalendarProvider>
            </InsiderTransactionsProvider>
        </SymbolProvider>
    );
};

export default DashboardProvider;