import { EarningsCalendarProvider } from '@/context/EarningsCalendarContext';
import { InsiderTransactionsProvider } from '@/context/InsiderTransactionsContext';
import { SymbolProvider } from '@/context/SymbolContext';
import { HistoricalSummaryProvider } from '@/context/HistoricalSummaryContext';
import { HistoricalDataProvider } from '@/context/HistoricalDataContext';
import { TradesProvider } from '@/context/TradesContext';
import { IPOsProvider } from '@/context/IposContext';
import { GainersLosersProvider } from '@/context/GainersLosersContext';
import { TickerDetailsProvider } from '@/context/TickerDetailsContext';
import { NewsProvider } from '@/context/NewsContext';
import { ChartDataProvider } from '@/context/ChartDataContext';
import { FinancialsProvider } from '@/context/FinancialsContext';

const DashboardProvider = ({ children }) => {
    {/* Wrap everything in SymbolProvider to ensure global access to symbol */}
    return (
        <SymbolProvider> 
            <TickerDetailsProvider>
                <TradesProvider>
                    <HistoricalDataProvider>
                        <HistoricalSummaryProvider>
                            <InsiderTransactionsProvider>
                                <EarningsCalendarProvider> 
                                    <IPOsProvider>
                                        <GainersLosersProvider>
                                            <ChartDataProvider>
                                            <NewsProvider>
                                                <FinancialsProvider>
                                                        {children}
                                                </FinancialsProvider>
                                            </NewsProvider>
                                            </ChartDataProvider>
                                        </GainersLosersProvider>
                                    </IPOsProvider>
                                </EarningsCalendarProvider>
                            </InsiderTransactionsProvider>
                        </HistoricalSummaryProvider>
                    </HistoricalDataProvider>
                </TradesProvider>
            </TickerDetailsProvider>
        </SymbolProvider>
    );
};

export default DashboardProvider;