import { Args, Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
import { InvoiceEntity } from "./invoice.entity";
import { InvoicesService } from "./invoices.service";

@Resolver(of => InvoiceEntity)
export class InvoicesResolver {
  constructor(
    private invoicesService: InvoicesService,
  ) {}

  @Query(returns => InvoiceEntity)
  async invoice(@Args('id', { type: () => String }) id: string) {
    return await this.invoicesService.findById(id);
  }

  @Query(returns => [InvoiceEntity])
  async invoices() {
    const invoices = await this.invoicesService.findAll();
    return invoices;
  }
}
