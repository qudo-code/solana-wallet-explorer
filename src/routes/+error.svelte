<script>
    import { page } from '$app/stores';
</script>

<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <h3>Error</h3>
                <p class="text-gold">{$page.error.message}</p>
            </div>
        </div>
    </div>
</div>