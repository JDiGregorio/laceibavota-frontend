import React, { useMemo, useState } from 'react'

import ListView from '@/components/widgets/ListView/ListView'
import Spinner from '@/components/layouts/Spinner'

import { useDebounce } from '@/utils/useDebounce'
import { defineModel } from '@/utils/modelUtils'
// import { usePermissions } from '@/hooks/usePermissions'

import { useListVotersQuery } from '@/generated-types'

const HEADERS = ['Nombre', 'DNI', 'Dirección', 'Télefono']

const Voters = (): React.ReactElement => {
    return <VotersListView />
}

const VotersListView = (): React.ReactElement => {
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchTerm = useDebounce(searchQuery, 500)

    const [currentPage, setCurrentPage] = useState(1)

    // const permissions = usePermissions()

    const { data, loading, error } = useListVotersQuery({
        fetchPolicy: 'network-only',
        variables: {
            first: 10,
            page: currentPage,
            search: debouncedSearchTerm,
        },
    })

    const voters = data?.voters.data
    const paginatorInfo = data?.voters.paginatorInfo

    const parsedColumns = useMemo((): string[][] => {
        if (voters) {
            return voters.map((voter) => [
              voter.id ?? '',
              voter.name ?? '',
              voter.dni ?? '',
              voter.address ?? '',
              voter.phone ?? ''
            ])
        } else {
            return []
        }
    }, [voters])

    const handlePageChanged = (newPage: number) => {
        setCurrentPage(newPage)
    }

    const handleSearchQueryChanged = (query: string): void => {
        setSearchQuery(query)
    }

    if (loading) {
        return <Spinner />
    }

    if (error) {
        return <>Oops, something went wrong.</>
    }

    if (!paginatorInfo || !voters) {
        return <></>
    }

    return (
        <ListView
            title={'Votantes'}
            canCreate={true} // permissions.canCreate("dip")
            canEdit={false} // permissions.canEdit("dip")
            paginatorInfo={paginatorInfo}
            headers={HEADERS}
            data={parsedColumns}
            model={defineModel('votante')}
            handlePageChanged={handlePageChanged}
            searchQuery={searchQuery}
            setSearchQuery={handleSearchQueryChanged}
        />
    )
}

export default Voters
