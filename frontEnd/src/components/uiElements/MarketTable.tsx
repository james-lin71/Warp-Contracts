import * as React from "react";

import { Avatar, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";

import AvatarGroup from '@material-ui/lab/AvatarGroup';

//@ts-ignore
function createData(icon, name, supplyShare, totalSupply, totalSupplyCurrency, totalSupplyChange, supplyApy, supplyApychange) {
    return { icon, name, supplyShare, totalSupply, totalSupplyCurrency, totalSupplyChange, supplyApy, supplyApychange };
}

const lenderData = [
    createData(<Avatar alt={'dai.png'} src={'dai.png'} />, 'Dai', 3.40, 125, 'DAI', 2.56, 3.67, -2.13),
    createData(<Avatar alt={'usdt.png'} src={'usdt.png'} />, 'Tether', 3.40, 125, 'DAI', 2.56, 3.67, -2.13),
    createData(<Avatar alt={'usdc.png'} src={'usdc.png'} />, 'USD Coin', 3.40, 125, 'DAI', 2.56, 3.67, -2.13),
];

const borrowData = [
    createData(<AvatarGroup max={2}><Avatar alt={'eth.png'} src={'eth.png'} />
        <Avatar alt={'dai.png'} src={'dai.png'} /></AvatarGroup>,
        'ETH - DAI', 1.97, 100, 'USD', 2.56, 45.23, -1.25),
    createData(<AvatarGroup><Avatar alt={'eth.png'} src={'eth.png'} />
        <Avatar alt={'usdt.png'} src={'usdt.png'} /></AvatarGroup>,
        'ETH - USDT', 3.25, 100, 'USD', 2.25, 45.23, -3.44),
    createData(<AvatarGroup><Avatar alt={'eth.png'} src={'eth.png'} />
        <Avatar alt={'usdc.png'} src={'usdc.png'} /></AvatarGroup>,
        'ETH - USDC', 1.32, 100, 'USD', 1.89, 45.23, -2.95),
    createData(<AvatarGroup><Avatar alt={'eth.png'} src={'eth.png'} />
        <Avatar alt={'wbtc.png'} src={'wbtc.png'} /></AvatarGroup>,
        'ETH - WBTC', 2.18, 100, 'USD', 1.12, 45.23, -2.13),
];

interface Props {
    type: "borrower" | "lender"
}

export const MarketTable: React.FC<Props> = (props: Props) => {
    const data = props.type === "borrower" ? borrowData : lenderData;
    const supplyOrBorrow = props.type === "borrower" ? "borrow" : "supply";

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1" color="textSecondary">
                                {props.type.charAt(0).toUpperCase() + props.type.slice(1)} market
                                    </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1" color="textSecondary">
                                Total {supplyOrBorrow}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1" color="textSecondary">
                                {props.type.charAt(0).toUpperCase() + props.type.slice(1)}  APY
                                    </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow>
                            <TableCell>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"
                                    spacing={2}
                                >

                                    {row.icon}
                                    <Grid
                                        item
                                        direction="column"
                                    >
                                        <Grid item>
                                            <Typography variant="subtitle1">
                                                {row.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                {row.supplyShare.toLocaleString(undefined, { minimumFractionDigits: 2 }) + "%"}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography variant="subtitle1">
                                            {row.totalSupply.toLocaleString() + " " + row.totalSupplyCurrency}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" color={row.totalSupplyChange > 0 ? "secondary" : "error"} >
                                            {row.totalSupplyChange > 0 ?
                                                `+${row.totalSupplyChange.toLocaleString(undefined, { minimumFractionDigits: 2 })}%` :
                                                `${row.totalSupplyChange.toLocaleString(undefined, { minimumFractionDigits: 2 })}%`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography variant="subtitle1">
                                            {row.supplyApy + "%"}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" color={row.supplyApychange > 0 ? "secondary" : "error"} >
                                            {row.supplyApychange > 0 ?
                                                `+${row.supplyApychange.toLocaleString(undefined, { minimumFractionDigits: 2 })}%` :
                                                `${row.supplyApychange.toLocaleString(undefined, { minimumFractionDigits: 2 })}%`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}