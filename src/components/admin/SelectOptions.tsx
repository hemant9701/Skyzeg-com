"use client";

import { useEffect, useState } from "react";
import { UnitOfWork } from "@/infrastructure/repositories/unit-of-work";

export interface SelectOption {
    value: string | number;
    label: string;
}

export interface RelationOptions {
    travelTypes: SelectOption[];
    destinations: SelectOption[];
    categories: SelectOption[];
}

interface RelationItem {
    _id: string;
    name: string;
}

const unitOfWork = new UnitOfWork();

const mapToSelectOption = (item: RelationItem): SelectOption => ({
    value: item._id,
    label: item.name,
});

const getTravelTypes = async (): Promise<SelectOption[]> => {
    const travelTypes = await unitOfWork.travelTypes.list(
        { isVisible: true },
        { sort: { sortOrder: 1 } }
    );

    return travelTypes.map(mapToSelectOption);
};

const getCategories = async (): Promise<SelectOption[]> => {
    const categories = await unitOfWork.categories.list(
        { isVisible: true },
        { sort: { sortOrder: 1 } }
    );

    return categories.map(mapToSelectOption);
};

const getDestinations = async (): Promise<SelectOption[]> => {
    const destinations = await unitOfWork.destinations.list(
        { isVisible: true },
        { sort: { sortOrder: 1 } }
    );

    return destinations.map(mapToSelectOption);
};

const SelectOptions = () => {
    const [relationOptions, setRelationOptions] =
        useState<RelationOptions>({
            travelTypes: [],
            destinations: [],
            categories: [],
        });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchSelectOptions = async () => {
            try {
                setLoading(true);
                setError(null);

                const [
                    travelTypes,
                    destinations,
                    categories,
                ] = await Promise.all([
                    getTravelTypes(),
                    getDestinations(),
                    getCategories(),
                ]);

                if (!isMounted) return;

                setRelationOptions({
                    travelTypes,
                    destinations,
                    categories,
                });
            } catch (error) {
                if (!isMounted) return;

                console.error("Error fetching select options:", error);

                setError(
                    error instanceof Error
                        ? error
                        : new Error("Failed to fetch select options")
                );
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchSelectOptions();

        return () => {
            isMounted = false;
        };

    }, []);

    return {
        relationOptions,
        loading,
        error,
    };
};

export default SelectOptions;