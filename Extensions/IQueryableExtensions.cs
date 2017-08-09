using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using vega.Core.Models;

namespace vega.Extensions
{
    public static class IQueryableExtensions
    {
        // il primo parametro è this, quindi non bisogna poi passarlo, è proprio per questo che
        // è un estensione. Tutti gli IQueryable adesso hanno questo metodo, es. query.ApplyOrdering(queryObj, columnsMap)
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, IQueryObject queryObj, Dictionary<string, Expression<Func<T, object>>> columnsMap) 
        {
            if (String.IsNullOrWhiteSpace(queryObj.SortBy) || columnsMap.ContainsKey(queryObj.SortBy))
                return query;

            if (queryObj.IsSortAscending)
                query = query.OrderBy(columnsMap[queryObj.SortBy]);
            else
                query = query.OrderByDescending(columnsMap[queryObj.SortBy]);

            return query;
        }
    }
}