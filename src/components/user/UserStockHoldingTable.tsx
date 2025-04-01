
import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowDownRight } from "lucide-react"
export const UserStockHoldingTable = ({ tokens }) => {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow className="text-gray-400 border-b border-gray-800">
                    <TableHead className="px-4 py-3 text-left">Name</TableHead>
                    <TableHead className="px-4 py-3 text-right">Current Price</TableHead>
                    <TableHead className="px-4 py-3 text-right">Change</TableHead>
                    <TableHead className="px-4 py-3 text-right">Shares Owned</TableHead>
                    <TableHead className="px-4 py-3 text-right">Total Value</TableHead>
                    <TableHead className="px-4 py-3 text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tokens.map((stock) => (
                    <TableRow key={stock.tokenId} className="border-b border-gray-800 text-sm">
                        <TableCell className="px-4 py-4 text-left">
                            <div>
                                <div className="font-medium">{stock.tokenName}</div>
                                <div className="text-gray-400">{stock.tokenSymbol}</div>
                            </div>
                        </TableCell>
                        <TableCell className="px-4 py-4 text-right font-medium">{stock.price} KES</TableCell>
                        <TableCell className={`px-4 py-4 text-right`}>
                        </TableCell>
                        <TableCell className="px-4 py-4 text-right">{stock.balance}</TableCell>
                        <TableCell className="px-4 py-4 text-right font-medium">{stock.balance} KES</TableCell>
                        <TableCell className=" flex justify-end">
                            <Button
                                className="bg-web3-error hover:bg-red-700 flex items-center"
                                size="sm"
                            >
                                <ArrowDownRight size={16} className="mr-1" />
                                Sell
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}